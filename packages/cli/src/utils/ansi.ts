import { wrapOsc8Link } from "./link.js";

const colorEnabled = !process.env.NO_COLOR;
const rgbCache = new Map<string, [number, number, number]>();
const fgSeqCache = new Map<string, string>();

function parseHexRgb(hex: string): [number, number, number] | null {
  const cached = rgbCache.get(hex);
  if(cached) return cached;

  const clean = hex.startsWith("#") ? hex.slice(1) : hex;
  if(!/^[0-9a-fA-F]{6}$/.test(clean)) return null;

  const rgb: [number, number, number] = [
    Number.parseInt(clean.slice(0, 2), 16),
    Number.parseInt(clean.slice(2, 4), 16),
    Number.parseInt(clean.slice(4, 6), 16),
  ];
  rgbCache.set(hex, rgb);
  return rgb;
}

function getFgSequence(hex: string): string {
  let cached = fgSeqCache.get(hex);
  if(cached !== undefined) return cached;
  const rgb = parseHexRgb(hex);
  cached = rgb ? `\x1b[38;2;${rgb[0]};${rgb[1]};${rgb[2]}m` : "";
  fgSeqCache.set(hex, cached);
  return cached;
}

export type AnsiStyle = {
  color?: string;
  backgroundColor?: string;
  restoreBackgroundColor?: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  url?: string;
};

export type AnsiRun = {
  text: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
};

export function styleAnsi(text: string, style: AnsiStyle): string {
  if(!text) return "";

  let out = text;

  if(colorEnabled) {
    let prefix = "";
    let suffix = "";

    if(style.bold) {
      prefix += "\x1b[1m";
      suffix = `\x1b[22m${suffix}`;
    }
    if(style.italic) {
      prefix += "\x1b[3m";
      suffix = `\x1b[23m${suffix}`;
    }
    if(style.strikethrough) {
      prefix += "\x1b[9m";
      suffix = `\x1b[29m${suffix}`;
    }
    if(style.color) {
      const fg = getFgSequence(style.color);
      if(fg) {
        prefix += fg;
        suffix = `\x1b[39m${suffix}`;
      }
    }
    if(style.backgroundColor) {
      const bg = parseHexRgb(style.backgroundColor);
      if(bg) {
        prefix += `\x1b[48;2;${bg[0]};${bg[1]};${bg[2]}m`;
        const restore = style.restoreBackgroundColor ? parseHexRgb(style.restoreBackgroundColor) : null;
        suffix = `${restore ? `\x1b[48;2;${restore[0]};${restore[1]};${restore[2]}m` : "\x1b[49m"}${suffix}`;
      }
    }

    out = `${prefix}${out}${suffix}`;
  }

  if(style.url) {
    out = wrapOsc8Link(out, style.url);
  }

  return out;
}

export function renderAnsiRuns(runs: readonly AnsiRun[], defaultColor?: string): string {
  if(runs.length === 0) return "";
  if(!colorEnabled) {
    return runs.map((run) => run.text).join("");
  }

  let out = "";
  let activeColor: string | undefined;
  let activeBold = false;
  let activeItalic = false;
  let activeStrike = false;

  for(const run of runs) {
    if(!run.text) continue;
    const nextStrike = Boolean(run.strikethrough);
    // Plain spaces carry no foreground glyph or italic slant; skip SGR switches for whitespace-only runs.
    if(!nextStrike && !activeStrike && /^ +$/.test(run.text)) {
      out += run.text;
      continue;
    }

    const nextColor = run.color ?? defaultColor;
    const nextBold = Boolean(run.bold);
    const nextItalic = Boolean(run.italic);

    if(activeBold && !nextBold) {
      out += "\x1b[22m";
      activeBold = false;
    }
    if(activeItalic && !nextItalic) {
      out += "\x1b[23m";
      activeItalic = false;
    }
    if(activeStrike && !nextStrike) {
      out += "\x1b[29m";
      activeStrike = false;
    }
    if(activeColor !== nextColor) {
      if(nextColor) {
        const fg = getFgSequence(nextColor);
        if(fg) {
          out += fg;
          activeColor = nextColor;
        } else if(activeColor) {
          out += "\x1b[39m";
          activeColor = undefined;
        }
      } else if(activeColor) {
        out += "\x1b[39m";
        activeColor = undefined;
      }
    }
    if(!activeBold && nextBold) {
      out += "\x1b[1m";
      activeBold = true;
    }
    if(!activeItalic && nextItalic) {
      out += "\x1b[3m";
      activeItalic = true;
    }
    if(!activeStrike && nextStrike) {
      out += "\x1b[9m";
      activeStrike = true;
    }

    out += run.text;
  }

  if(activeColor) out += "\x1b[39m";
  if(activeStrike) out += "\x1b[29m";
  if(activeItalic) out += "\x1b[23m";
  if(activeBold) out += "\x1b[22m";

  return out;
}
