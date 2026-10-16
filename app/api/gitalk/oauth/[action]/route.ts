import {
  handleAuthorize,
  handleCallback,
  handleTokenRequest,
  OAuthError
} from "./oauth";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ action: string }>;
}

async function handle(request: Request, ctx: RouteContext): Promise<Response> {
  const requestUrl = new URL(request.url);
  let response: Response;

  try {
    const { action } = await ctx.params;
    const allowedMethod = action === "token" ? "POST" : "GET";

    if(
      action !== "authorize"
      && action !== "callback"
      && action !== "token"
    ) {
      throw new OAuthError(404, "Not Found.");
    }

    if(request.method !== allowedMethod) {
      response = new Response(null, {
        status: 405,
        headers: { Allow: allowedMethod }
      });
    } else {
      const config = {
        clientID: process.env.NEXT_PUBLIC_GITALK_CLIENT_ID ?? "",
        clientSecret: process.env["GITALK_CLIENT_SECRET"] ?? "",
        sessionSecret: process.env["GITALK_SESSION_SECRET"] ?? ""
      };

      if(!config.clientID || !config.clientSecret || !/^[a-f\d]{64}$/i.test(config.sessionSecret)) {
        throw new OAuthError(503, "Gitalk sign-in is not configured yet.");
      }

      switch(action) {
        case "authorize":
          response = handleAuthorize(requestUrl, config);
          break;
        case "callback":
          response = await handleCallback(request, requestUrl, config);
          break;
        case "token":
          response = await handleTokenRequest(request, requestUrl, config);
          break;
      }
    }
  } catch (error) {
    if(error instanceof OAuthError) {
      response = Response.json({ error: error.message }, { status: error.status });
    } else {
      console.error("Gitalk OAuth request failed.");
      response = Response.json(
        { error: "Unable to complete GitHub sign-in. Please try again." },
        { status: 502 }
      );
    }
  }

  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}

export const GET = handle;
export const POST = handle;
