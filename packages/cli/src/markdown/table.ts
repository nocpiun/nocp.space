import { styleAnsi } from "../ansi.js";
import { charWidth, stringWidth } from "../text-width.js";
import { colors } from "../theme.js";
import {
  pushInlineSpan,
  pushWrappedSpans,
  renderInlineSegments,
  wrapInlineSpans,
  type InlineSpan,
} from "./inline.js";

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
    const base = Math.min(minCol, Math.floor(remaining / unlockedIndices.length));
    const extraPool = Math.max(0, remaining - base * unlockedIndices.length);
    const excessNatural = unlockedIndices.reduce((sum, col) => sum + Math.max(0, natural[col] - base), 0);
    let distributed = 0;

    for(const col of unlockedIndices) {
      const bonus = excessNatural > 0
        ? Math.floor((extraPool * Math.max(0, natural[col] - base)) / excessNatural)
        : 0;
      const w = base + bonus;
      widths[col] = w;
      distributed += w;
    }

    let extra = remaining - distributed;
    let progressed = true;
    while(extra > 0 && progressed) {
      progressed = false;
      for(const col of unlockedIndices) {
        if(extra === 0) break;
        if(widths[col] < natural[col]) {
          widths[col]++;
          extra--;
          progressed = true;
        }
      }
    }
    for(let i = 0; extra > 0; i = (i + 1) % unlockedIndices.length) {
      widths[unlockedIndices[i]]++;
      extra--;
    }
  }

  return widths;
}

export function renderTableBlock(
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

export function parseHtmlTable(block: string): { rows: InlineSpan[][][]; hasHeader: boolean } {
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
