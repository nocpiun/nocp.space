import { type ReactNode } from "react";
import { Box, Text } from "ink";
import { wrapText } from "./text-width.js";
import { colors } from "./theme.js";

function cleanInlineMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, (_, alt: string) => (alt ? `[图片: ${alt}]` : "[图片]"))
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    .replace(/<br\s*\/?>/gi, " / ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function pushWrapped(
  lines: ReactNode[],
  text: string,
  width: number,
  color: string,
  options?: { bold?: boolean; italic?: boolean; prefix?: string; prefixColor?: string },
) {
  const prefix = options?.prefix ?? "";
  const indent = " ".repeat(prefix.length);
  const contentWidth = Math.max(8, width - prefix.length);
  const wrapped = wrapText(text, contentWidth);

  for(let i = 0; i < wrapped.length; i++) {
    const linePrefix = i === 0 ? prefix : indent;
    lines.push(
      <Box width={width} height={1}>
        {linePrefix && <Text color={options?.prefixColor ?? colors.border}>{linePrefix}</Text>}
        <Text color={color} bold={options?.bold} italic={options?.italic}>
          {wrapped[i]}
        </Text>
      </Box>
    );
  }
}

function parseHtmlTable(block: string): string[] {
  const rows: string[] = [];
  const rowMatches = block.matchAll(/<tr[\s\S]*?<\/tr>/gi);
  for(const rowMatch of rowMatches) {
    const cells: string[] = [];
    const cellMatches = rowMatch[0].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi);
    for(const cellMatch of cellMatches) {
      const cleaned = cleanInlineMarkdown(cellMatch[1]);
      if(cleaned) cells.push(cleaned);
    }
    if(cells.length > 0) rows.push(cells.join(" | "));
  }
  return rows;
}

export function renderMarkdownLines(content: string, width: number): ReactNode[] {
  const rawLines = content.replace(/\r\n/g, "\n").split("\n");
  const lines: ReactNode[] = [];
  let index = 0;

  while(index < rawLines.length) {
    const line = rawLines[index];
    const trimmed = line.trim();

    if(!trimmed) {
      if(lines.length > 0 && lines[lines.length - 1] !== null) {
        lines.push(null);
      }
      index++;
      continue;
    }

    if(trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      if(lang) {
        lines.push(<Text color={colors.muted}>{`[${lang}]`}</Text>);
      }
      index++;
      while(index < rawLines.length && !rawLines[index].trim().startsWith("```")) {
        const codeLine = rawLines[index];
        for(const wrapped of wrapText(codeLine, Math.max(8, width - 2))) {
          lines.push(
            <Box width={width} height={1}>
              <Text color={colors.border}>{"│ "}</Text>
              <Text color={colors.secondary}>{wrapped}</Text>
            </Box>
          );
        }
        index++;
      }
      index++;
      continue;
    }

    if(trimmed.startsWith("$$")) {
      if(trimmed.length > 2 && trimmed.endsWith("$$")) {
        pushWrapped(lines, trimmed.slice(2, -2).trim(), width, colors.secondary, {
          prefix: "  ",
        });
        index++;
        continue;
      }
      index++;
      while(index < rawLines.length && !rawLines[index].trim().endsWith("$$")) {
        const mathLine = rawLines[index].trim();
        if(mathLine) {
          pushWrapped(lines, mathLine, width, colors.secondary, { prefix: "  " });
        }
        index++;
      }
      index++;
      continue;
    }

    if(/^<table[\s>]/i.test(trimmed)) {
      const tableChunks = [line];
      while(index + 1 < rawLines.length && !/<\/table>/i.test(rawLines[index])) {
        index++;
        tableChunks.push(rawLines[index]);
      }
      index++;
      for(const rowText of parseHtmlTable(tableChunks.join("\n"))) {
        pushWrapped(lines, rowText, width, colors.secondary, { prefix: "• ", prefixColor: colors.muted });
      }
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if(headingMatch) {
      if(lines.length > 0 && lines[lines.length - 1] !== null) {
        lines.push(null);
      }
      const level = headingMatch[1].length;
      const titleText = cleanInlineMarkdown(headingMatch[2]);
      pushWrapped(lines, titleText, width, level <= 2 ? colors.text : colors.secondary, {
        bold: true,
        prefix: level <= 2 ? "# " : "## ",
        prefixColor: colors.muted,
      });
      index++;
      continue;
    }

    if(/^(-{3,}|\*{3,})$/.test(trimmed)) {
      lines.push(<Text color={colors.border}>{"─".repeat(Math.min(width, 28))}</Text>);
      index++;
      continue;
    }

    if(trimmed.startsWith(">")) {
      const quoteText = cleanInlineMarkdown(trimmed.replace(/^>\s?/, ""));
      if(quoteText) {
        pushWrapped(lines, quoteText, width, colors.secondary, {
          italic: true,
          prefix: "│ ",
          prefixColor: colors.border,
        });
      }
      index++;
      continue;
    }

    const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
    if(listMatch) {
      const indentSpaces = Math.min(4, Math.floor(listMatch[1].length / 2) * 2);
      const bullet = listMatch[2].endsWith(".") ? `${listMatch[2]} ` : "• ";
      const itemText = cleanInlineMarkdown(listMatch[3]);
      pushWrapped(lines, itemText, width, colors.secondary, {
        prefix: `${" ".repeat(indentSpaces)}${bullet}`,
        prefixColor: colors.muted,
      });
      index++;
      continue;
    }

    if(trimmed.startsWith("|") && trimmed.endsWith("|")) {
      if(!/^\|[\s:-]+\|$/.test(trimmed.replace(/\|/g, "|").replace(/[^|\s:-]/g, ""))) {
        const cells = trimmed
          .slice(1, -1)
          .split("|")
          .map((cell) => cleanInlineMarkdown(cell))
          .filter(Boolean);
        if(cells.length > 0) {
          pushWrapped(lines, cells.join(" | "), width, colors.secondary, {
            prefix: "│ ",
            prefixColor: colors.border,
          });
        }
      }
      index++;
      continue;
    }

    const paragraph = cleanInlineMarkdown(trimmed);
    if(paragraph) {
      pushWrapped(lines, paragraph, width, colors.text);
    }
    index++;
  }

  while(lines.length > 0 && lines[lines.length - 1] === null) {
    lines.pop();
  }

  return lines;
}
