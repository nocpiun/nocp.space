import { type ReactNode } from "react";
import { Box, Text } from "ink";
import type * as Mdast from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { siteUrl } from "@nocp/shared";
import { highlightCodeBlock, wrapHighlightedLine } from "./highlight.js";
import { TerminalLink } from "./link.js";
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

function renderInlineSegments(segments: readonly InlineSpan[], defaultColor: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let index = 0;

  while(index < segments.length) {
    const current = segments[index];
    if(current.url) {
      const url = current.url;
      const group: InlineSpan[] = [current];
      while(index + 1 < segments.length && segments[index + 1].url === url) {
        index++;
        group.push(segments[index]);
      }
      nodes.push(
        <TerminalLink key={`link-${index}`} url={url}>
          {group.map((part, partIndex) => (
            <Text
              key={partIndex}
              color={part.color ?? defaultColor}
              bold={part.bold}
              italic={part.italic}
              strikethrough={part.strikethrough}>
              {part.text}
            </Text>
          ))}
        </TerminalLink>
      );
    } else {
      nodes.push(
        <Text
          key={`span-${index}`}
          color={current.color ?? defaultColor}
          bold={current.bold}
          italic={current.italic}
          strikethrough={current.strikethrough}>
          {current.text}
        </Text>
      );
    }
    index++;
  }

  return nodes;
}

function pushWrappedSpans(
  lines: ReactNode[],
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
    lines.push(
      <Box width={width} height={1}>
        {linePrefix && <Text color={options?.prefixColor ?? colors.border}>{linePrefix}</Text>}
        {renderInlineSegments(wrapped[i], defaultColor)}
      </Box>
    );
  }
}

function pushImageLine(lines: ReactNode[], alt: string, rawUrl: string, width: number) {
  const url = resolveSiteUrl(rawUrl);
  const label = alt ? `[图片: ${alt}]` : "[图片]";
  const singleLine = `${label} ${url}`;

  if(wrapText(singleLine, width).length === 1) {
    lines.push(
      <Box width={width} height={1}>
        <Text color={colors.secondary}>{`${label} `}</Text>
        <TerminalLink url={url}>
          <Text color={colors.muted}>{url}</Text>
        </TerminalLink>
      </Box>
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
  lines: ReactNode[],
  value: string,
  lang: string,
  width: number,
  prefix = "│ ",
  prefixColor = colors.border,
) {
  if(lang) {
    lines.push(
      <Box width={width} height={1}>
        {prefix !== "│ " && <Text color={prefixColor}>{prefix}</Text>}
        <Text color={colors.muted}>{`[${lang}]`}</Text>
      </Box>
    );
  }

  const codeWidth = Math.max(8, width - stringWidth(prefix));
  const highlightedLines = highlightCodeBlock(value, lang);

  for(const hlLine of highlightedLines) {
    for(const wrappedLine of wrapHighlightedLine(hlLine, codeWidth)) {
      const usedWidth = wrappedLine.tokens.reduce((sum, token) => sum + stringWidth(token.text), 0);
      const padWidth = wrappedLine.backgroundColor ? Math.max(0, codeWidth - usedWidth) : 0;

      lines.push(
        <Box width={width} height={1}>
          <Text color={prefixColor}>{prefix}</Text>
          {wrappedLine.tokens.map((token, tokenIndex) => (
            <Text
              key={tokenIndex}
              color={token.color}
              backgroundColor={wrappedLine.backgroundColor}
              italic={token.italic}
              bold={token.bold}>
              {token.text}
            </Text>
          ))}
          {padWidth > 0 && <Text backgroundColor={wrappedLine.backgroundColor}>{" ".repeat(padWidth)}</Text>}
        </Box>
      );
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
  lines: ReactNode[],
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

  const makeRule = (left: string, join: string, right: string) => `${left}${colWidths.map((w) => "─".repeat(w + 2)).join(join)}${right}`;

  const pushRule = (rule: string) => {
    lines.push(
      <Box width={width} height={1}>
        {prefix && <Text color={prefixColor}>{prefix}</Text>}
        <Text color={colors.border}>{rule}</Text>
      </Box>
    );
  };

  pushRule(makeRule("┌", "┬", "┐"));

  for(let r = 0; r < wrappedRows.length; r++) {
    const rowCells = wrappedRows[r];
    const rowHeight = rowHeights[r];

    for(let lineIdx = 0; lineIdx < rowHeight; lineIdx++) {
      lines.push(
        <Box width={width} height={1}>
          {prefix && <Text color={prefixColor}>{prefix}</Text>}
          <Text color={colors.border}>{"│ "}</Text>
          {rowCells.map((cellLines, col) => {
            const segments = cellLines[lineIdx] ?? [];
            const used = spanLineWidth(segments);
            const pad = " ".repeat(Math.max(0, colWidths[col] - used));
            return (
              <Text key={col}>
                {renderInlineSegments(segments, r === 0 && hasHeader ? colors.text : defaultColor)}
                {pad}
                <Text color={colors.border}>{col < colCount - 1 ? " │ " : " │"}</Text>
              </Text>
            );
          })}
        </Box>
      );
    }

    if(r < wrappedRows.length - 1 && ((r === 0 && hasHeader) || useRowSeparators)) {
      pushRule(makeRule("├", "┼", "┤"));
    }
  }

  pushRule(makeRule("└", "┴", "┘"));
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
  lines: ReactNode[],
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
        if(lines.length > 0 && lines[lines.length - 1] !== null) {
          lines.push(null);
        }
        lines.push(<Text color={colors.border}>{"─".repeat(Math.min(width, 28))}</Text>);
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

    if(index > 0 && lines.length > 0 && lines[lines.length - 1] !== null) {
      const prev = nodes[index - 1];
      const tight = Boolean(options?.prefix && prev.type === "paragraph" && node.type === "paragraph");
      if(!tight) lines.push(null);
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
            <Box width={width} height={1}>
              <Text color={callout.style.color}>{`${prefix}│ `}</Text>
              <Text color={callout.style.color} bold>{title}</Text>
            </Box>
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
        lines.push(<Text color={colors.border}>{"─".repeat(Math.min(width, 28))}</Text>);
        break;
      }
      default:
        break;
    }
  }
}

export function renderMarkdownLines(content: string, width: number): ReactNode[] {
  const tree = markdownParser.parse(content);
  const lines: ReactNode[] = [];
  renderBlockNodes(tree.children, lines, width);

  while(lines.length > 0 && lines[lines.length - 1] === null) {
    lines.pop();
  }

  return lines;
}
