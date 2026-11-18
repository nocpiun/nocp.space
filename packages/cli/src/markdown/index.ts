import type * as Mdast from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { styleAnsi } from "../utils/ansi.js";
import { stringWidth } from "../utils/text-width.js";
import { colors } from "../theme.js";
import { extractCallout } from "./callout.js";
import { renderCodeBlock } from "./code.js";
import { collectDefinitions, collectPhrasingSpans, pushImageLine, pushWrappedSpans } from "./inline.js";
import { parseHtmlTable, renderTableBlock } from "./table.js";

const markdownParser = unified().use(remarkParse).use(remarkGfm);

function renderBlockNodes(
  nodes: readonly Mdast.RootContent[],
  lines: string[],
  width: number,
  definitions: ReadonlyMap<string, string>,
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
    if(node.type === "definition") continue;

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
        const spans = collectPhrasingSpans(firstChild.children, definitions, { color: colors.muted });
        pushWrappedSpans(lines, spans, width, colors.muted, {
          prefix: itemPrefix,
          continuationPrefix: " ".repeat(stringWidth(itemPrefix)),
          prefixColor: colors.muted,
        });
        if(node.children.length > 1) {
          renderBlockNodes(node.children.slice(1), lines, width, definitions, {
            defaultColor: colors.muted,
            prefix: " ".repeat(stringWidth(itemPrefix)),
            prefixColor: colors.muted,
          });
        }
      } else {
        renderBlockNodes(node.children, lines, width, definitions, {
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
        const spans = collectPhrasingSpans(node.children, definitions, { bold: true, color });
        pushWrappedSpans(lines, spans, width, color, {
          prefix: `${prefix}${marker}`,
          continuationPrefix: `${prefix}${" ".repeat(marker.length)}`,
          prefixColor: colors.muted,
        });
        break;
      }
      case "paragraph": {
        if(!prefix && node.children.length === 1) {
          const single = node.children[0];
          if(single.type === "image") {
            pushImageLine(lines, single.alt ?? "", single.url, width);
            break;
          }
          if(single.type === "imageReference") {
            const url = definitions.get(single.identifier.toLowerCase());
            if(url) {
              pushImageLine(lines, single.alt ?? "", url, width);
              break;
            }
          }
        }
        const spans = collectPhrasingSpans(node.children, definitions, {
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
            renderBlockNodes(callout.children, lines, width, definitions, {
              defaultColor: colors.prose,
              prefix: `${prefix}│ `,
              prefixColor: callout.style.color,
            });
          }
        } else {
          renderBlockNodes(node.children, lines, width, definitions, {
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
              const spans = collectPhrasingSpans(child.children, definitions, { color: defaultColor });
              pushWrappedSpans(lines, spans, width, defaultColor, {
                prefix: childIdx === 0 ? itemPrefix : contPrefix,
                continuationPrefix: contPrefix,
                prefixColor: colors.muted,
              });
            } else if(child.type === "list") {
              renderBlockNodes([child], lines, width, definitions, {
                defaultColor,
                prefix,
                prefixColor,
                listDepth: listDepth + 1,
              });
            } else {
              renderBlockNodes([child], lines, width, definitions, {
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
            collectPhrasingSpans(cell.children, definitions, {
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
  const definitions = collectDefinitions(tree.children);
  const lines: string[] = [];
  renderBlockNodes(tree.children, lines, width, definitions);

  while(lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }

  if(markdownLinesCache.size >= 64) markdownLinesCache.clear();
  markdownLinesCache.set(cacheKey, lines);
  return lines;
}
