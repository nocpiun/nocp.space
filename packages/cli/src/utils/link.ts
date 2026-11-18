import ansiEscapes from "ansi-escapes";
import supportsHyperlinks from "supports-hyperlinks";

export const supportsOsc8 = supportsHyperlinks.stdout
  || (Boolean(process.stdout.isTTY) && (
    process.env.TERM_PROGRAM === "vscode"
    || Boolean(process.env.CURSOR_TRACE_ID)
  ));

export function wrapOsc8Link(text: string, url: string): string {
  return supportsOsc8 ? ansiEscapes.link(text, url) : text;
}
