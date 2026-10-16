import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  timingSafeEqual
} from "node:crypto";

export interface GitalkOAuthConfig {
  clientID: string;
  clientSecret: string;
  sessionSecret: string;
}

interface LoginState {
  state: string;
  verifier: string;
  returnTo: string;
  validUntil: number;
}

interface GitalkSession {
  accessToken: string;
  tokenExpiresAt?: number;
  refreshToken?: string;
  refreshExpiresAt?: number;
  browser: string;
  validUntil: number;
}

interface GitHubTokenResponse {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
}

type GitHubTokens = GitHubTokenResponse & { access_token: string };

const OAUTH_PATH = "/api/gitalk/oauth";
const LOGIN_COOKIE_NAME = "gitalk_oauth";
const BROWSER_COOKIE_NAME = "gitalk_browser";
const LOGIN_TTL_SECONDS = 600;
const SESSION_TTL_SECONDS = 30 * 24 * 60 * 60;
const MAX_REQUEST_BYTES = 16 * 1024;
const TOKEN_REFRESH_WINDOW_MS = 60_000;

export class OAuthError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** `/api/gitalk/oauth/authorize` */
export function handleAuthorize(requestUrl: URL, config: GitalkOAuthConfig) {
  const returnTo = requestUrl.searchParams.get("return_to") ?? "/";
  const loginState: LoginState = {
    state: randomBytes(32).toString("base64url"),
    verifier: randomBytes(32).toString("base64url"),
    returnTo: parseReturnUrl(returnTo, requestUrl.origin).href,
    validUntil: Date.now() + LOGIN_TTL_SECONDS * 1000
  };

  const githubUrl = new URL("https://github.com/login/oauth/authorize");
  githubUrl.search = new URLSearchParams({
    client_id: config.clientID,
    redirect_uri: `${requestUrl.origin}${OAUTH_PATH}/callback`,
    state: loginState.state,
    code_challenge: createHash("sha256").update(loginState.verifier).digest("base64url"),
    code_challenge_method: "S256"
  }).toString();

  const loginCookie = encryptPayload(loginState, "login", config, requestUrl.origin);

  return new Response(null, {
    status: 302,
    headers: {
      "Location": githubUrl.href,
      "Set-Cookie": createCookie(LOGIN_COOKIE_NAME, loginCookie, LOGIN_TTL_SECONDS, requestUrl)
    }
  });
}

/** `/api/gitalk/oauth/callback` */
export async function handleCallback(request: Request, requestUrl: URL, config: GitalkOAuthConfig) {
  const loginCookie = getCookie(request, LOGIN_COOKIE_NAME);
  const loginState = decryptPayload<LoginState>(loginCookie, "login", config, requestUrl.origin);
  const returnedState = requestUrl.searchParams.get("state") ?? "";

  if(!secretsMatch(loginState.state, returnedState)) {
    throw new OAuthError(401, "Invalid OAuth state. Please sign in again.");
  }

  const returnUrl = parseReturnUrl(loginState.returnTo, requestUrl.origin);
  const headers = new Headers({
    "Set-Cookie": createCookie(LOGIN_COOKIE_NAME, "", 0, requestUrl)
  });

  if(requestUrl.searchParams.has("error")) {
    headers.set("Location", returnUrl.href);
    return new Response(null, { status: 302, headers });
  }

  const authorizationCode = requestUrl.searchParams.get("code");
  if(!authorizationCode) {
    throw new OAuthError(400, "Missing authorization code.");
  }

  const tokens = await requestGitHubToken(config, {
    code: authorizationCode,
    redirect_uri: `${requestUrl.origin}${OAUTH_PATH}/callback`,
    code_verifier: loginState.verifier
  });
  const browserToken = randomBytes(32).toString("base64url");
  const session = updateSessionTokens({
    accessToken: "",
    browser: browserToken,
    validUntil: Date.now() + SESSION_TTL_SECONDS * 1000
  }, tokens);

  const encryptedSession = encryptPayload(session, "session", config, requestUrl.origin);
  returnUrl.searchParams.set("gitalk_session", encryptedSession);
  headers.set("Location", returnUrl.href);

  // Require the browser cookie as well as the session from the URL to redeem a token.
  headers.append("Set-Cookie", createCookie(BROWSER_COOKIE_NAME, browserToken, SESSION_TTL_SECONDS, requestUrl));
  return new Response(null, { status: 302, headers });
}

/** `/api/gitalk/oauth/token` */
export async function handleTokenRequest(request: Request, requestUrl: URL, config: GitalkOAuthConfig) {
  if(request.headers.get("Origin") !== requestUrl.origin) {
    throw new OAuthError(403, "Cross-origin requests are not allowed.");
  }

  const encryptedSession = await readSessionToken(request);
  let session = decryptPayload<GitalkSession>(encryptedSession, "session", config, requestUrl.origin);
  const browserToken = getCookie(request, BROWSER_COOKIE_NAME);

  if(!secretsMatch(session.browser, browserToken)) {
    throw new OAuthError(401, "Please sign in again in this browser.");
  }

  if(session.tokenExpiresAt && session.tokenExpiresAt <= Date.now() + TOKEN_REFRESH_WINDOW_MS) {
    const refreshTokenExpired = session.refreshExpiresAt && session.refreshExpiresAt <= Date.now();
    if(!session.refreshToken || refreshTokenExpired) {
      throw new OAuthError(401, "Your GitHub authorization has expired. Please sign in again.");
    }

    const tokens = await requestGitHubToken(config, {
      grant_type: "refresh_token",
      refresh_token: session.refreshToken
    });
    session = updateSessionTokens(session, tokens);
  }

  const expiresIn = session.tokenExpiresAt
    ? Math.max(1, Math.floor((session.tokenExpiresAt - Date.now()) / 1000))
    : undefined;

  return Response.json({
    access_token: session.accessToken,
    expires_in: expiresIn,
    session: encryptPayload(session, "session", config, requestUrl.origin)
  });
}

async function requestGitHubToken(
  config: GitalkOAuthConfig,
  parameters: Record<string, string>
): Promise<GitHubTokens> {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "User-Agent": "nocp-space-gitalk"
    },
    body: JSON.stringify({
      client_id: config.clientID,
      client_secret: config.clientSecret,
      ...parameters
    }),
    signal: AbortSignal.timeout(10_000)
  });

  if(response.status >= 500) {
    throw new OAuthError(502, "GitHub is unavailable. Please try again.");
  }

  const tokens = await response.json() as GitHubTokenResponse;
  if(!response.ok || typeof tokens.access_token !== "string" || !tokens.access_token) {
    throw new OAuthError(401, "GitHub authorization failed. Please sign in again.");
  }

  return { ...tokens, access_token: tokens.access_token };
}

function updateSessionTokens(session: GitalkSession, tokens: GitHubTokens): GitalkSession {
  return {
    ...session,
    accessToken: tokens.access_token,
    tokenExpiresAt: tokens.expires_in ? Date.now() + tokens.expires_in * 1000 : undefined,
    refreshToken: tokens.refresh_token ?? session.refreshToken,
    refreshExpiresAt: tokens.refresh_token_expires_in
      ? Date.now() + tokens.refresh_token_expires_in * 1000
      : session.refreshExpiresAt
  };
}

async function readSessionToken(request: Request): Promise<string> {
  const contentType = request.headers.get("Content-Type")?.split(";")[0].trim();
  if(contentType !== "application/json") {
    throw new OAuthError(415, "Expected application/json.");
  }

  const reader = request.body?.getReader();
  if(!reader) {
    throw new OAuthError(400, "Missing session.");
  }

  const chunks: Uint8Array[] = [];
  let bodySize = 0;

  try {
    while(true) {
      const { done, value: chunk } = await reader.read();
      if(done) break;

      bodySize += chunk.byteLength;
      if(bodySize > MAX_REQUEST_BYTES) {
        await reader.cancel();
        throw new OAuthError(413, "Request too large.");
      }

      chunks.push(chunk);
    }
  } finally {
    reader.releaseLock();
  }

  try {
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if(typeof body?.session !== "string" || !body.session) {
      throw new Error("Missing session");
    }

    return body.session as string;
  } catch {
    throw new OAuthError(400, "Invalid session request.");
  }
}

function encryptPayload(
  payload: LoginState | GitalkSession,
  purpose: string,
  config: GitalkOAuthConfig,
  origin: string
) {
  const key = Buffer.from(config.sessionSecret, "hex");
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);

  // Bind ciphertext to its purpose, App and origin so login cookies cannot be used as sessions.
  cipher.setAAD(Buffer.from(`${purpose}:${config.clientID}:${origin}`));
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final()
  ]);

  return Buffer.concat([iv, cipher.getAuthTag(), ciphertext]).toString("base64url");
}

function decryptPayload<T extends { validUntil: number }>(
  encryptedPayload: string,
  purpose: string,
  config: GitalkOAuthConfig,
  origin: string
): T {
  try {
    const encryptedBytes = Buffer.from(encryptedPayload, "base64url");
    const iv = encryptedBytes.subarray(0, 12);
    const authTag = encryptedBytes.subarray(12, 28);
    const ciphertext = encryptedBytes.subarray(28);
    const key = Buffer.from(config.sessionSecret, "hex");
    const decipher = createDecipheriv("aes-256-gcm", key, iv);

    decipher.setAAD(Buffer.from(`${purpose}:${config.clientID}:${origin}`));
    decipher.setAuthTag(authTag);

    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    const payload = JSON.parse(plaintext.toString("utf8")) as T;
    if(!Number.isFinite(payload.validUntil) || payload.validUntil <= Date.now()) {
      throw new Error("Expired");
    }

    return payload;
  } catch {
    throw new OAuthError(401, "Invalid or expired Gitalk session. Please sign in again.");
  }
}

function secretsMatch(left: string, right: string) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

function getCookie(request: Request, name: string) {
  const cookie = request.headers.get("Cookie")
    ?.split(";")
    .map(value => value.trim())
    .find(value => value.startsWith(`${name}=`));

  return cookie?.slice(name.length + 1) ?? "";
}

function createCookie(name: string, value: string, maxAge: number, requestUrl: URL) {
  const attributes = [
    `${name}=${value}`,
    `Path=${OAUTH_PATH}`,
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAge}`
  ];

  if(requestUrl.protocol === "https:") {
    attributes.push("Secure");
  }

  return attributes.join("; ");
}

function parseReturnUrl(value: string, origin: string) {
  let returnUrl: URL;

  try {
    returnUrl = new URL(value, origin);
  } catch {
    throw new OAuthError(400, "Invalid return URL.");
  }

  if(
    value.length > 2048 ||
    returnUrl.origin !== origin ||
    returnUrl.username ||
    returnUrl.password ||
    returnUrl.pathname.startsWith("/api/gitalk")
  ) {
    throw new OAuthError(400, "The return URL must be a page on this site.");
  }

  returnUrl.searchParams.delete("gitalk_session");
  return returnUrl;
}
