import type * as Mdast from "mdast";
import { siteUrl } from "@nocp/shared";
import { renderAnsiRuns, styleAnsi } from "../utils/ansi.js";
import { charWidth, stringWidth, wrapText } from "../utils/text-width.js";
import { colors } from "../theme.js";
import { stripInlineHtml } from "./html.js";

export type InlineSpan = {
  text: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  url?: string;
};

const inlineCodeColor = "#ce9178";

export function resolveSiteUrl(url: string): string {
  const clean = url.trim();
  return clean.startsWith("/") ? `${siteUrl}${clean}` : clean;
}

export function pushInlineSpan(spans: InlineSpan[], span: InlineSpan) {
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

export function collectDefinitions(
  nodes: readonly Mdast.RootContent[],
  map = new Map<string, string>(),
): Map<string, string> {
  for(const node of nodes) {
    if(node.type === "definition") {
      map.set(node.identifier.toLowerCase(), resolveSiteUrl(node.url));
    } else if("children" in node && Array.isArray(node.children)) {
      collectDefinitions(node.children as readonly Mdast.RootContent[], map);
    }
  }
  return map;
}

export function collectPhrasingSpans(
  nodes: readonly Mdast.PhrasingContent[],
  definitions: ReadonlyMap<string, string>,
  base: Omit<InlineSpan, "text"> = {},
): InlineSpan[] {
  const spans: InlineSpan[] = [];

  for(const node of nodes) {
    switch(node.type) {
      case "text":
        pushInlineSpan(spans, { ...base, text: node.value });
        break;
      case "emphasis":
        for(const child of collectPhrasingSpans(node.children, definitions, { ...base, italic: true })) {
          pushInlineSpan(spans, child);
        }
        break;
      case "strong":
        for(const child of collectPhrasingSpans(node.children, definitions, { ...base, bold: true })) {
          pushInlineSpan(spans, child);
        }
        break;
      case "delete":
        for(const child of collectPhrasingSpans(node.children, definitions, { ...base, strikethrough: true })) {
          pushInlineSpan(spans, child);
        }
        break;
      case "inlineCode":
        pushInlineSpan(spans, { ...base, color: base.color ?? inlineCodeColor, text: node.value });
        break;
      case "inlineMath":
        pushInlineSpan(spans, { ...base, color: base.color ?? colors.text, text: node.value });
        break;
      case "link": {
        const url = resolveSiteUrl(node.url);
        const children = node.children.length > 0
          ? collectPhrasingSpans(node.children, definitions, { ...base, url })
          : [{ ...base, url, text: url }];
        for(const child of children) {
          pushInlineSpan(spans, child);
        }
        break;
      }
      case "linkReference": {
        const url = definitions.get(node.identifier.toLowerCase());
        const nextBase = url ? { ...base, url } : base;
        const children = node.children.length > 0
          ? collectPhrasingSpans(node.children, definitions, nextBase)
          : url
            ? [{ ...nextBase, text: url }]
            : node.label
              ? [{ ...base, text: `[${node.label}]` }]
              : [];
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
      case "imageReference": {
        const url = definitions.get(node.identifier.toLowerCase());
        pushInlineSpan(spans, {
          ...base,
          color: colors.secondary,
          text: node.alt ? `[图片: ${node.alt}]` : "[图片]",
        });
        if(url) {
          pushInlineSpan(spans, {
            ...base,
            color: colors.muted,
            url,
            text: ` (${url})`,
          });
        }
        break;
      }
      case "footnoteReference":
        pushInlineSpan(spans, { ...base, color: colors.muted, text: `[${node.identifier}]` });
        break;
      case "break":
        spans.push({ ...base, text: "\n" });
        break;
      case "html": {
        const stripped = node.value.replace(/<!--[\s\S]*?-->/g, "").trim();
        if(/^<br\s*\/?>$/i.test(stripped)) {
          spans.push({ ...base, text: "\n" });
        } else {
          const text = stripInlineHtml(node.value);
          if(text) pushInlineSpan(spans, { ...base, text });
        }
        break;
      }
      default:
        break;
    }
  }

  return spans;
}

export function wrapInlineSpans(spans: readonly InlineSpan[], maxWidth: number): InlineSpan[][] {
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

export function renderInlineSegments(segments: readonly InlineSpan[], defaultColor: string): string {
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

export function pushWrappedSpans(
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

export function pushImageLine(lines: string[], alt: string, rawUrl: string, width: number) {
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
