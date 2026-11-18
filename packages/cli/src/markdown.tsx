import type * as Mdast from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { siteUrl } from "@nocp/shared";
import { renderAnsiRuns, styleAnsi } from "./ansi.js";
import { highlightCodeBlock, wrapHighlightedLine } from "./highlight.js";
import { charWidth, stringWidth, wrapText } from "./text-width.js";
import { colors } from "./theme.js";

const markdownParser = unified().use(remarkParse).use(remarkGfm);

type InlineSpan = {
  text: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  url?: string;
};

type CalloutStyle = {
  label: string;
  color: string;
};

const calloutStyles: Record<string, CalloutStyle> = {
  info: { label: "Info", color: "#58a6ff" },
  note: { label: "Note", color: "#58a6ff" },
  tip: { label: "Tip", color: "#3fb950" },
  important: { label: "Important", color: "#a371f7" },
  warning: { label: "Warning", color: "#d29922" },
  caution: { label: "Caution", color: "#f85149" },
  error: { label: "Error", color: "#f85149" },
  danger: { label: "Danger", color: "#f85149" },
};

const inlineCodeColor = "#ce9178";

function resolveSiteUrl(url: string): string {
  const clean = url.trim();
  return clean.startsWith("/") ? `${siteUrl}${clean}` : clean;
}

function pushInlineSpan(spans: InlineSpan[], span: InlineSpan) {
  if(!span.text) return;
  const last = spans[spans.length - 1];
  if(
    last
    && last.color === span.color
    && Boolean(last.bold) === Boolean(span.bold)
    && Boolean(last.italic) === Boolean(span.italic)
    && Boolean(last.strikethrough) === Boolean(span.strikethrough)
    && last.url === span.url
  ) {
    last.text += span.text;
    return;
  }
  spans.push({ ...span });
}

function collectPhrasingSpans(
  nodes: readonly Mdast.PhrasingContent[],
  base: Omit<InlineSpan, "text"> = {},
): InlineSpan[] {
  const spans: InlineSpan[] = [];

  for(const node of nodes) {
    switch(node.type) {
      case "text":
        pushInlineSpan(spans, { ...base, text: node.value });
        break;
      case "emphasis":
        for(const child of collectPhrasingSpans(node.children, { ...base, italic: true })) {
          pushInlineSpan(spans, child);
        }
        break;
      case "strong":
        for(const child of collectPhrasingSpans(node.children, { ...base, bold: true })) {
          pushInlineSpan(spans, child);
        }
        break;
      case "delete":
        for(const child of collectPhrasingSpans(node.children, { ...base, strikethrough: true })) {
          pushInlineSpan(spans, child);
        }
        break;
      case "inlineCode":
        pushInlineSpan(spans, { ...base, color: base.color ?? inlineCodeColor, text: node.value });
        break;
      case "link": {
        const url = resolveSiteUrl(node.url);
        const children = node.children.length > 0
          ? collectPhrasingSpans(node.children, { ...base, url })
          : [{ ...base, url, text: url }];
        for(const child of children) {
          pushInlineSpan(spans, child);
        }
        break;
      }
      case "image": {
        const url = resolveSiteUrl(node.url);
        pushInlineSpan(spans, {
          ...base,
          color: colors.secondary,
          text: node.alt ? `[图片: ${node.alt}]` : "[图片]",
        });
        pushInlineSpan(spans, {
          ...base,
          color: colors.muted,
          url,
          text: ` (${url})`,
        });
        break;
      }
      case "footnoteReference":
        pushInlineSpan(spans, { ...base, color: colors.muted, text: `[${node.identifier}]` });
        break;
      case "break":
        spans.push({ ...base, text: "\n" });
        break;
      case "html": {
        if(/^<br\s*\/?>$/i.test(node.value.trim())) {
          spans.push({ ...base, text: "\n" });
        } else {
          const stripped = node.value.replace(/<[^>]+>/g, "");
          if(stripped) pushInlineSpan(spans, { ...base, text: stripped });
        }
        break;
      }
      default:
        break;
    }
  }

  return spans;
}

function wrapInlineSpans(spans: readonly InlineSpan[], maxWidth: number): InlineSpan[][] {
  if(maxWidth <= 0) return [[]];

  const lines: InlineSpan[][] = [[]];
  let lineWidth = 0;

  for(const span of spans) {
    for(const ch of span.text) {
      if(ch === "\n") {
        lines.push([]);
        lineWidth = 0;
        continue;
      }

      const normalized = ch === "\r" ? "" : ch === "\t" ? " " : ch;
      if(!normalized) continue;

      const w = charWidth(normalized);
      if(lineWidth + w > maxWidth && lines[lines.length - 1].length > 0) {
        lines.push([]);
        lineWidth = 0;
        if(normalized === " ") continue;
      }

      pushInlineSpan(lines[lines.length - 1], { ...span, text: normalized });
      lineWidth += w;
    }
  }

  return lines;
}

function renderInlineSegments(segments: readonly InlineSpan[], defaultColor: string): string {
  let out = "";
  let index = 0;

  while(index < segments.length) {
    const current = segments[index];
    if(current.url) {
      const url = current.url;
      const linkRuns: InlineSpan[] = [];
      while(index < segments.length && segments[index].url === url) {
        linkRuns.push(segments[index]);
        index++;
      }
      out += styleAnsi(renderAnsiRuns(linkRuns, defaultColor), { url });
    } else {
      const plainRuns: InlineSpan[] = [];
      while(index < segments.length && !segments[index].url) {
        plainRuns.push(segments[index]);
        index++;
      }
      out += renderAnsiRuns(plainRuns, defaultColor);
    }
  }

  return out;
}

function pushWrappedSpans(
  lines: string[],
  spans: readonly InlineSpan[],
  width: number,
  defaultColor: string,
  options?: { prefix?: string; continuationPrefix?: string; prefixColor?: string },
) {
  const prefix = options?.prefix ?? "";
  const continuationPrefix = options?.continuationPrefix ?? " ".repeat(stringWidth(prefix));
  const prefixWidth = Math.max(stringWidth(prefix), stringWidth(continuationPrefix));
  const contentWidth = Math.max(8, width - prefixWidth);
  const wrapped = wrapInlineSpans(spans, contentWidth);

  for(let i = 0; i < wrapped.length; i++) {
    const linePrefix = i === 0 ? prefix : continuationPrefix;
    const prefixText = linePrefix
      ? styleAnsi(linePrefix, { color: options?.prefixColor ?? colors.border })
      : "";
    lines.push(`${prefixText}${renderInlineSegments(wrapped[i], defaultColor)}`);
  }
}

function pushImageLine(lines: string[], alt: string, rawUrl: string, width: number) {
  const url = resolveSiteUrl(rawUrl);
  const label = alt ? `[图片: ${alt}]` : "[图片]";
  const singleLine = `${label} ${url}`;

  if(wrapText(singleLine, width).length === 1) {
    lines.push(
      `${styleAnsi(`${label} `, { color: colors.secondary })}${styleAnsi(url, { color: colors.muted, url })}`,
    );
    return;
  }

  pushWrappedSpans(lines, [{ text: label, color: colors.secondary }], width, colors.secondary);
  pushWrappedSpans(
    lines,
    [{ text: url, color: colors.muted, url }],
    width,
    colors.muted,
    { prefix: "  ", continuationPrefix: "  ", prefixColor: colors.muted },
  );
}

function renderCodeBlock(
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

function spanLineWidth(spans: readonly InlineSpan[]): number {
  return spans.reduce((sum, span) => sum + stringWidth(span.text), 0);
}

function measureSpansMaxLineWidth(spans: readonly InlineSpan[]): number {
  let max = 0;
  let current = 0;
  for(const span of spans) {
    for(const ch of span.text) {
      if(ch === "\n") {
        if(current > max) max = current;
        current = 0;
        continue;
      }
      if(ch === "\r") continue;
      current += charWidth(ch === "\t" ? " " : ch);
    }
  }
  return Math.max(max, current);
}

function computeTableColumnWidths(rows: readonly (readonly InlineSpan[][])[], maxWidth: number): number[] | null {
  const colCount = Math.max(0, ...rows.map((row) => row.length));
  if(colCount === 0) return null;

  const avail = maxWidth - (3 * colCount + 1);
  if(avail < colCount * 3) return null;

  const natural = Array.from({ length: colCount }, (_, col) => {
    let widest = 3;
    for(const row of rows) {
      const cell = row[col];
      if(cell) widest = Math.max(widest, measureSpansMaxLineWidth(cell));
    }
    return widest;
  });

  const totalNatural = natural.reduce((sum, w) => sum + w, 0);
  if(totalNatural <= avail) return natural;

  const minCol = Math.min(8, Math.floor(avail / colCount));
  const widths = new Array<number>(colCount).fill(0);
  const locked = new Array<boolean>(colCount).fill(false);
  let remaining = avail;

  // Lock columns whose natural width already fits within their fair share.
  let changed = true;
  while(changed) {
    changed = false;
    const unlockedCount = locked.filter((isLocked) => !isLocked).length;
    if(unlockedCount === 0) break;
    const share = Math.floor(remaining / unlockedCount);

    for(let col = 0; col < colCount; col++) {
      if(!locked[col] && natural[col] <= Math.max(minCol, share)) {
        widths[col] = natural[col];
        locked[col] = true;
        remaining -= widths[col];
        changed = true;
      }
    }
  }

  const unlockedIndices: number[] = [];
  for(let col = 0; col < colCount; col++) {
    if(!locked[col]) unlockedIndices.push(col);
  }

  if(unlockedIndices.length > 0) {
    const unlockedNatural = unlockedIndices.reduce((sum, col) => sum + natural[col], 0);
    let distributed = 0;
    for(const col of unlockedIndices) {
      const w = Math.max(minCol, Math.floor((remaining * natural[col]) / unlockedNatural));
      widths[col] = w;
      distributed += w;
    }
    let extra = remaining - distributed;
    for(let i = 0; extra > 0; i = (i + 1) % unlockedIndices.length) {
      widths[unlockedIndices[i]]++;
      extra--;
    }
  }

  return widths;
}

function renderTableBlock(
  lines: string[],
  rows: readonly (readonly InlineSpan[][])[],
  width: number,
  defaultColor: string,
  hasHeader: boolean,
  prefix = "",
  prefixColor = colors.border,
) {
  if(rows.length === 0) return;

  const prefixWidth = stringWidth(prefix);
  const tableWidth = Math.max(8, width - prefixWidth);
  const colWidths = computeTableColumnWidths(rows, tableWidth);

  if(!colWidths) {
    for(const row of rows) {
      const joined: InlineSpan[] = [];
      for(let c = 0; c < row.length; c++) {
        if(c > 0) pushInlineSpan(joined, { text: " | ", color: colors.muted });
        for(const span of row[c]) pushInlineSpan(joined, span);
      }
      pushWrappedSpans(lines, joined, width, defaultColor, {
        prefix: `${prefix}│ `,
        continuationPrefix: `${prefix}│ `,
        prefixColor,
      });
    }
    return;
  }

  const colCount = colWidths.length;
  const wrappedRows = rows.map((row) => (
    Array.from({ length: colCount }, (_, col) => wrapInlineSpans(row[col] ?? [], colWidths[col]))
  ));
  const rowHeights = wrappedRows.map((row) => Math.max(1, ...row.map((cellLines) => cellLines.length)));
  const useRowSeparators = rowHeights.some((h) => h > 1);
  const leadPrefix = prefix ? styleAnsi(prefix, { color: prefixColor }) : "";
  const leftPipe = styleAnsi("│ ", { color: colors.border });
  const midPipe = styleAnsi(" │ ", { color: colors.border });
  const rightPipe = styleAnsi(" │", { color: colors.border });

  const makeRule = (left: string, join: string, right: string) => (
    `${leadPrefix}${styleAnsi(`${left}${colWidths.map((w) => "─".repeat(w + 2)).join(join)}${right}`, { color: colors.border })}`
  );

  lines.push(makeRule("┌", "┬", "┐"));

  for(let r = 0; r < wrappedRows.length; r++) {
    const rowCells = wrappedRows[r];
    const rowHeight = rowHeights[r];
    const rowColor = r === 0 && hasHeader ? colors.text : defaultColor;

    for(let lineIdx = 0; lineIdx < rowHeight; lineIdx++) {
      let rowStr = `${leadPrefix}${leftPipe}`;
      for(let col = 0; col < colCount; col++) {
        const segments = rowCells[col][lineIdx] ?? [];
        const used = spanLineWidth(segments);
        const pad = " ".repeat(Math.max(0, colWidths[col] - used));
        rowStr += renderInlineSegments(segments, rowColor);
        rowStr += pad;
        rowStr += col < colCount - 1 ? midPipe : rightPipe;
      }
      lines.push(rowStr);
    }

    if(r < wrappedRows.length - 1 && ((r === 0 && hasHeader) || useRowSeparators)) {
      lines.push(makeRule("├", "┼", "┤"));
    }
  }

  lines.push(makeRule("└", "┴", "┘"));
}

function parseHtmlTable(block: string): { rows: InlineSpan[][][]; hasHeader: boolean } {
  const rows: InlineSpan[][][] = [];
  let hasHeader = false;
  const rowMatches = block.matchAll(/<tr[\s\S]*?<\/tr>/gi);

  for(const rowMatch of rowMatches) {
    const cells: InlineSpan[][] = [];
    const cellMatches = rowMatch[0].matchAll(/<(t[hd])[^>]*>([\s\S]*?)<\/t[hd]>/gi);
    let rowIsHeader = false;

    for(const cellMatch of cellMatches) {
      if(cellMatch[1].toLowerCase() === "th") rowIsHeader = true;
      const normalizedLines = cellMatch[2]
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .split("\n")
        .map((part) => part.replace(/\s+/g, " ").trim())
        .filter(Boolean);
      const text = normalizedLines.join("\n");
      cells.push(text ? [{ text, bold: rowIsHeader, color: rowIsHeader ? colors.text : undefined }] : []);
    }

    if(cells.length > 0) {
      if(rows.length === 0 && rowIsHeader) hasHeader = true;
      rows.push(cells);
    }
  }

  return { rows, hasHeader };
}

function extractCallout(node: Mdast.Blockquote): {
  style: CalloutStyle;
  titleText?: string;
  children: (Mdast.BlockContent | Mdast.DefinitionContent)[];
} | null {
  const first = node.children[0];
  if(!first || first.type !== "paragraph" || first.children.length === 0) return null;
  const firstChild = first.children[0];
  if(firstChild.type !== "text") return null;

  const match = firstChild.value.match(/^\[!([A-Za-z]+)\](?:[ \t]+([^\r\n]+))?(?:\r?\n([\s\S]*))?$/);
  if(!match) return null;

  const key = match[1].toLowerCase();
  const style = calloutStyles[key] ?? {
    label: key.charAt(0).toUpperCase() + key.slice(1),
    color: colors.secondary,
  };

  const remainingParagraphChildren: Mdast.PhrasingContent[] = [];
  if(match[3]) {
    remainingParagraphChildren.push({ type: "text", value: match[3] });
  }
  const restInFirst = first.children.slice(1);
  if(restInFirst.length > 0) {
    const trimmedRest = !match[3] && restInFirst[0].type === "break" ? restInFirst.slice(1) : restInFirst;
    remainingParagraphChildren.push(...trimmedRest);
  }

  const children: (Mdast.BlockContent | Mdast.DefinitionContent)[] = [];
  if(remainingParagraphChildren.length > 0) {
    children.push({ type: "paragraph", children: remainingParagraphChildren });
  }
  children.push(...node.children.slice(1));

  return {
    style,
    titleText: match[2]?.trim(),
    children,
  };
}

function renderBlockNodes(
  nodes: readonly Mdast.RootContent[],
  lines: string[],
  width: number,
  options?: {
    defaultColor?: string;
    prefix?: string;
    prefixColor?: string;
    italic?: boolean;
    listDepth?: number;
  },
) {
  const defaultColor = options?.defaultColor ?? colors.prose;
  const prefix = options?.prefix ?? "";
  const prefixColor = options?.prefixColor ?? colors.border;
  const listDepth = options?.listDepth ?? 0;
  let inFootnotes = false;

  for(let index = 0; index < nodes.length; index++) {
    const node = nodes[index];

    if(node.type === "footnoteDefinition") {
      if(!inFootnotes) {
        inFootnotes = true;
        if(lines.length > 0 && lines[lines.length - 1] !== "") {
          lines.push("");
        }
        lines.push(styleAnsi("─".repeat(Math.min(width, 28)), { color: colors.border }));
      }

      const itemPrefix = `[${node.identifier}] `;
      const firstChild = node.children[0];
      if(firstChild && firstChild.type === "paragraph") {
        const spans = collectPhrasingSpans(firstChild.children, { color: colors.muted });
        pushWrappedSpans(lines, spans, width, colors.muted, {
          prefix: itemPrefix,
          continuationPrefix: " ".repeat(stringWidth(itemPrefix)),
          prefixColor: colors.muted,
        });
        if(node.children.length > 1) {
          renderBlockNodes(node.children.slice(1), lines, width, {
            defaultColor: colors.muted,
            prefix: " ".repeat(stringWidth(itemPrefix)),
            prefixColor: colors.muted,
          });
        }
      } else {
        renderBlockNodes(node.children, lines, width, {
          defaultColor: colors.muted,
          prefix: itemPrefix,
          prefixColor: colors.muted,
        });
      }
      continue;
    }

    inFootnotes = false;

    if(index > 0 && lines.length > 0 && lines[lines.length - 1] !== "") {
      const prev = nodes[index - 1];
      const tight = Boolean(options?.prefix && prev.type === "paragraph" && node.type === "paragraph");
      if(!tight) lines.push("");
    }

    switch(node.type) {
      case "heading": {
        const marker = node.depth <= 2 ? "# " : "## ";
        const color = node.depth <= 2 ? colors.text : colors.prose;
        const spans = collectPhrasingSpans(node.children, { bold: true, color });
        pushWrappedSpans(lines, spans, width, color, {
          prefix: `${prefix}${marker}`,
          continuationPrefix: `${prefix}${" ".repeat(marker.length)}`,
          prefixColor: colors.muted,
        });
        break;
      }
      case "paragraph": {
        if(!prefix && node.children.length === 1 && node.children[0].type === "image") {
          const img = node.children[0];
          pushImageLine(lines, img.alt ?? "", img.url, width);
          break;
        }
        const spans = collectPhrasingSpans(node.children, {
          color: defaultColor,
          italic: options?.italic,
        });
        pushWrappedSpans(lines, spans, width, defaultColor, {
          prefix,
          continuationPrefix: prefix,
          prefixColor,
        });
        break;
      }
      case "code": {
        renderCodeBlock(
          lines,
          node.value,
          node.lang ?? "",
          width,
          prefix ? `${prefix}` : "│ ",
          prefixColor,
        );
        break;
      }
      case "blockquote": {
        const callout = extractCallout(node);
        if(callout) {
          const title = callout.titleText || callout.style.label;
          lines.push(
            `${styleAnsi(`${prefix}│ `, { color: callout.style.color })}${styleAnsi(title, { color: callout.style.color, bold: true })}`,
          );
          if(callout.children.length > 0) {
            renderBlockNodes(callout.children, lines, width, {
              defaultColor: colors.prose,
              prefix: `${prefix}│ `,
              prefixColor: callout.style.color,
            });
          }
        } else {
          renderBlockNodes(node.children, lines, width, {
            defaultColor: colors.secondary,
            prefix: `${prefix}│ `,
            prefixColor: colors.border,
            italic: true,
          });
        }
        break;
      }
      case "list": {
        const indent = " ".repeat(Math.min(4, listDepth * 2));
        for(let itemIndex = 0; itemIndex < node.children.length; itemIndex++) {
          const item = node.children[itemIndex];
          const bullet = node.ordered ? `${(node.start ?? 1) + itemIndex}. ` : "• ";
          const itemPrefix = `${prefix}${indent}${bullet}`;
          const contPrefix = `${prefix}${indent}${" ".repeat(stringWidth(bullet))}`;

          for(let childIdx = 0; childIdx < item.children.length; childIdx++) {
            const child = item.children[childIdx];
            if(child.type === "paragraph") {
              const spans = collectPhrasingSpans(child.children, { color: defaultColor });
              pushWrappedSpans(lines, spans, width, defaultColor, {
                prefix: childIdx === 0 ? itemPrefix : contPrefix,
                continuationPrefix: contPrefix,
                prefixColor: colors.muted,
              });
            } else if(child.type === "list") {
              renderBlockNodes([child], lines, width, {
                defaultColor,
                prefix,
                prefixColor,
                listDepth: listDepth + 1,
              });
            } else {
              renderBlockNodes([child], lines, width, {
                defaultColor,
                prefix: contPrefix,
                prefixColor: colors.muted,
                listDepth: listDepth + 1,
              });
            }
          }
        }
        break;
      }
      case "table": {
        const rows = node.children.map((row, rowIndex) => (
          row.children.map((cell) => (
            collectPhrasingSpans(cell.children, {
              color: rowIndex === 0 ? colors.text : defaultColor,
              bold: rowIndex === 0,
            })
          ))
        ));
        renderTableBlock(lines, rows, width, defaultColor, true, prefix, prefixColor);
        break;
      }
      case "html": {
        const trimmed = node.value.trim();
        if(/^<table[\s>]/i.test(trimmed)) {
          const { rows, hasHeader } = parseHtmlTable(trimmed);
          renderTableBlock(lines, rows, width, defaultColor, hasHeader, prefix, prefixColor);
        }
        break;
      }
      case "thematicBreak": {
        lines.push(styleAnsi("─".repeat(Math.min(width, 28)), { color: colors.border }));
        break;
      }
      default:
        break;
    }
  }
}

const markdownLinesCache = new Map<string, readonly string[]>();

export function renderMarkdownLines(content: string, width: number): readonly string[] {
  const cacheKey = `${width}\0${content}`;
  const cached = markdownLinesCache.get(cacheKey);
  if(cached) return cached;

  const tree = markdownParser.parse(content);
  const lines: string[] = [];
  renderBlockNodes(tree.children, lines, width);

  while(lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }

  if(markdownLinesCache.size >= 64) markdownLinesCache.clear();
  markdownLinesCache.set(cacheKey, lines);
  return lines;
}
