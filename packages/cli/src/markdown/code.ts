import { renderAnsiRuns, styleAnsi } from "../utils/ansi.js";
import { highlightCodeBlock, wrapHighlightedLine } from "../utils/highlight.js";
import { stringWidth } from "../utils/text-width.js";
import { colors } from "../theme.js";

export function renderCodeBlock(
  lines: string[],
  value: string,
  lang: string,
  width: number,
  prefix = "│ ",
  prefixColor = colors.border,
) {
  if(lang) {
    const lead = prefix !== "│ " ? styleAnsi(prefix, { color: prefixColor }) : "";
    lines.push(`${lead}${styleAnsi(`[${lang}]`, { color: colors.muted })}`);
  }

  const styledPrefix = styleAnsi(prefix, { color: prefixColor });
  const codeWidth = Math.max(8, width - stringWidth(prefix));
  const highlightedLines = highlightCodeBlock(value, lang);

  for(const hlLine of highlightedLines) {
    for(const wrappedLine of wrapHighlightedLine(hlLine, codeWidth)) {
      if(wrappedLine.backgroundColor) {
        let usedWidth = 0;
        for(const token of wrappedLine.tokens) {
          usedWidth += stringWidth(token.text);
        }
        const body = renderAnsiRuns(wrappedLine.tokens);
        const padWidth = Math.max(0, codeWidth - usedWidth);
        const fullBody = padWidth > 0 ? `${body}${" ".repeat(padWidth)}` : body;
        lines.push(`${styledPrefix}${styleAnsi(fullBody, {
          backgroundColor: wrappedLine.backgroundColor,
          restoreBackgroundColor: colors.card,
        })}`);
      } else {
        lines.push(renderAnsiRuns([{ text: prefix, color: prefixColor }, ...wrappedLine.tokens]));
      }
    }
  }
}
