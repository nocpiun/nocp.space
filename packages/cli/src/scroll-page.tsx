import { memo, useState, type ReactNode } from "react";
import { Box, Text, useInput } from "ink";
import { colors } from "./theme.js";

export type LineRange = {
  start: number;
  end: number;
};

function fitRangeOffset(range: LineRange, currentStart: number, visibleCount: number, maxOffset: number): number {
  let next = currentStart;
  if(range.start < next) next = range.start;
  else if(range.end >= next + visibleCount) next = range.end - visibleCount + 1;
  return Math.max(0, Math.min(next, maxOffset));
}

type ScrollPageProps = {
  title: string;
  subtitle?: ReactNode;
  lines: readonly ReactNode[];
  maxHeight: number;
  keyboardActive: boolean;
  selectedIndex?: number;
  itemRanges?: readonly LineRange[];
  onSelect?: (index: number) => void;
};

export const ScrollPage = memo(function ScrollPage({
  title,
  subtitle,
  lines,
  maxHeight,
  keyboardActive,
  selectedIndex,
  itemRanges,
  onSelect,
}: ScrollPageProps) {
  const visibleCount = Math.min(lines.length, Math.max(1, maxHeight - 3));
  const maxOffset = Math.max(0, lines.length - visibleCount);
  const [offset, setOffset] = useState(() => {
    if(selectedIndex === undefined) return 0;
    const range = itemRanges?.[selectedIndex];
    if(!range) return 0;
    return fitRangeOffset(range, 0, visibleCount, maxOffset);
  });
  const start = Math.min(offset, maxOffset);
  const selectable = Boolean(onSelect && itemRanges && itemRanges.length > 0 && selectedIndex !== undefined);

  useInput((_input, key) => {
    if(selectable && onSelect && itemRanges && selectedIndex !== undefined) {
      const count = itemRanges.length;
      const current = Math.max(0, Math.min(selectedIndex, count - 1));
      const currentRange = itemRanges[current];
      const totalSpan = itemRanges[count - 1].end - itemRanges[0].start + 1;
      const avgSpan = Math.max(1, Math.round(totalSpan / count));
      const pageStep = Math.max(1, Math.floor(visibleCount / avgSpan));

      if(key.downArrow) {
        if(currentRange.end >= start + visibleCount) {
          setOffset(fitRangeOffset(currentRange, start, visibleCount, maxOffset));
        } else if(current < count - 1) {
          const nextIndex = current + 1;
          onSelect(nextIndex);
          setOffset(fitRangeOffset(itemRanges[nextIndex], start, visibleCount, maxOffset));
        } else if(start < maxOffset) {
          setOffset(Math.min(maxOffset, start + 1));
        }
      } else if(key.upArrow) {
        if(currentRange.start < start) {
          setOffset(Math.max(0, start - 1));
        } else if(current > 0) {
          const nextIndex = current - 1;
          onSelect(nextIndex);
          setOffset(fitRangeOffset(itemRanges[nextIndex], start, visibleCount, maxOffset));
        } else if(start > 0) {
          setOffset(Math.max(0, start - 1));
        }
      } else if(key.pageDown) {
        if(current < count - 1) {
          const nextIndex = Math.min(count - 1, current + pageStep);
          onSelect(nextIndex);
          setOffset(fitRangeOffset(itemRanges[nextIndex], start, visibleCount, maxOffset));
        } else if(start < maxOffset) {
          setOffset(Math.min(maxOffset, start + visibleCount));
        }
      } else if(key.pageUp) {
        if(currentRange.start < start) {
          setOffset(Math.max(currentRange.start, start - visibleCount));
        } else if(current > 0) {
          const nextIndex = Math.max(0, current - pageStep);
          onSelect(nextIndex);
          setOffset(fitRangeOffset(itemRanges[nextIndex], start, visibleCount, maxOffset));
        } else if(start > 0) {
          setOffset(0);
        }
      }
      return;
    }

    let next = start;
    if(key.upArrow) next--;
    else if(key.downArrow) next++;
    else if(key.pageUp) next -= visibleCount;
    else if(key.pageDown) next += visibleCount;
    else return;
    setOffset(Math.max(0, Math.min(next, maxOffset)));
  }, { isActive: keyboardActive });

  return (
    <Box flexDirection="column" height={visibleCount + 3} flexShrink={0}>
      <Box marginTop={1} height={1} justifyContent="space-between">
        <Text color={colors.text} bold>{title}</Text>
        {subtitle}
      </Box>
      <Box flexDirection="column" height={visibleCount}>
        {lines.slice(start, start + visibleCount).map((line, index) => (
          <Box key={start + index} height={1}>
            {line}
          </Box>
        ))}
      </Box>
      <Box height={1} justifyContent="space-between">
        {!selectable && maxOffset > 0 ? <Text color={colors.muted}>↑↓ 滚动 · PgUp/PgDn</Text> : <Box/>}
        {maxOffset > 0 && <Text color={colors.muted}>{`${start + 1}-${start + visibleCount}/${lines.length}`}</Text>}
      </Box>
    </Box>
  );
});
