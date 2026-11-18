import { memo, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Box, Text, Transform, useInput } from "ink";
import { colors } from "./theme.js";

const bgWrapEnabled = !process.env.NO_COLOR
  && (Boolean(process.stdout.isTTY) || Boolean(process.env.FORCE_COLOR && process.env.FORCE_COLOR !== "0"));

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
  header?: readonly ReactNode[];
  lines?: readonly ReactNode[];
  textLines?: readonly string[];
  maxHeight: number;
  keyboardActive: boolean;
  selectedIndex?: number;
  itemRanges?: readonly LineRange[];
  onSelect?: (index: number) => void;
};

export const ScrollPage = memo(function ScrollPage({
  title,
  subtitle,
  header,
  lines,
  textLines,
  maxHeight,
  keyboardActive,
  selectedIndex,
  itemRanges,
  onSelect,
}: ScrollPageProps) {
  const totalLines = textLines ? textLines.length : (lines?.length ?? 0);
  const headerHeight = header?.length ?? 0;
  const visibleCount = Math.min(totalLines, Math.max(1, maxHeight - 4 - headerHeight));
  const maxOffset = Math.max(0, totalLines - visibleCount);
  const [offset, setOffset] = useState(() => {
    if(selectedIndex === undefined) return 0;
    const range = itemRanges?.[selectedIndex];
    if(!range) return 0;
    return fitRangeOffset(range, 0, visibleCount, maxOffset);
  });
  const start = Math.min(offset, maxOffset);
  const selectable = Boolean(onSelect && itemRanges && itemRanges.length > 0 && selectedIndex !== undefined);
  const lastScrollRef = useRef<{ time: number; dir: -1 | 1 | 0 }>({ time: 0, dir: 0 });
  const liveSelectRef = useRef({ index: selectedIndex ?? 0, start });
  liveSelectRef.current = { index: selectedIndex ?? 0, start };

  const pendingDeltaRef = useRef(0);
  const flushScheduledRef = useRef(false);
  const mountedRef = useRef(true);
  const maxOffsetRef = useRef(maxOffset);
  maxOffsetRef.current = maxOffset;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useInput((_input, key) => {
    if(selectable && onSelect && itemRanges && selectedIndex !== undefined) {
      const count = itemRanges.length;
      const current = Math.max(0, Math.min(liveSelectRef.current.index, count - 1));
      const curStart = liveSelectRef.current.start;
      const currentRange = itemRanges[current];
      const totalSpan = itemRanges[count - 1].end - itemRanges[0].start + 1;
      const avgSpan = Math.max(1, Math.round(totalSpan / count));
      const pageStep = Math.max(1, Math.floor(visibleCount / avgSpan));

      if(key.downArrow) {
        if(currentRange.end >= curStart + visibleCount) {
          const nextStart = fitRangeOffset(currentRange, curStart, visibleCount, maxOffset);
          liveSelectRef.current.start = nextStart;
          setOffset(nextStart);
        } else if(current < count - 1) {
          const nextIndex = current + 1;
          const nextStart = fitRangeOffset(itemRanges[nextIndex], curStart, visibleCount, maxOffset);
          liveSelectRef.current = { index: nextIndex, start: nextStart };
          onSelect(nextIndex);
          setOffset(nextStart);
        } else if(curStart < maxOffset) {
          const nextStart = Math.min(maxOffset, curStart + 1);
          liveSelectRef.current.start = nextStart;
          setOffset(nextStart);
        }
      } else if(key.upArrow) {
        if(currentRange.start < curStart) {
          const nextStart = Math.max(0, curStart - 1);
          liveSelectRef.current.start = nextStart;
          setOffset(nextStart);
        } else if(current > 0) {
          const nextIndex = current - 1;
          const nextStart = fitRangeOffset(itemRanges[nextIndex], curStart, visibleCount, maxOffset);
          liveSelectRef.current = { index: nextIndex, start: nextStart };
          onSelect(nextIndex);
          setOffset(nextStart);
        } else if(curStart > 0) {
          const nextStart = Math.max(0, curStart - 1);
          liveSelectRef.current.start = nextStart;
          setOffset(nextStart);
        }
      } else if(key.pageDown) {
        if(current < count - 1) {
          const nextIndex = Math.min(count - 1, current + pageStep);
          const nextStart = fitRangeOffset(itemRanges[nextIndex], curStart, visibleCount, maxOffset);
          liveSelectRef.current = { index: nextIndex, start: nextStart };
          onSelect(nextIndex);
          setOffset(nextStart);
        } else if(curStart < maxOffset) {
          const nextStart = Math.min(maxOffset, curStart + visibleCount);
          liveSelectRef.current.start = nextStart;
          setOffset(nextStart);
        }
      } else if(key.pageUp) {
        if(currentRange.start < curStart) {
          const nextStart = Math.max(currentRange.start, curStart - visibleCount);
          liveSelectRef.current.start = nextStart;
          setOffset(nextStart);
        } else if(current > 0) {
          const nextIndex = Math.max(0, current - pageStep);
          const nextStart = fitRangeOffset(itemRanges[nextIndex], curStart, visibleCount, maxOffset);
          liveSelectRef.current = { index: nextIndex, start: nextStart };
          onSelect(nextIndex);
          setOffset(nextStart);
        } else if(curStart > 0) {
          liveSelectRef.current.start = 0;
          setOffset(0);
        }
      }
      return;
    }

    let delta = 0;
    if(key.upArrow || key.downArrow) {
      const dir: -1 | 1 = key.upArrow ? -1 : 1;
      const now = performance.now();
      const dt = now - lastScrollRef.current.time;
      const step = lastScrollRef.current.dir === dir && dt > 4 && dt <= 80 ? 2 : 1;
      lastScrollRef.current = { time: now, dir };
      delta = dir * step;
    } else if(key.pageUp) {
      delta = -visibleCount;
    } else if(key.pageDown) {
      delta = visibleCount;
    } else if(key.home) {
      pendingDeltaRef.current = 0;
      setOffset(0);
      return;
    } else if(key.end) {
      pendingDeltaRef.current = 0;
      setOffset(maxOffset);
      return;
    } else {
      return;
    }

    // Coalesce burst scroll events (e.g. mouse wheel / buffered repeats in one stdin read) into a single render.
    pendingDeltaRef.current += delta;
    if(!flushScheduledRef.current) {
      flushScheduledRef.current = true;
      queueMicrotask(() => {
        flushScheduledRef.current = false;
        const queued = pendingDeltaRef.current;
        pendingDeltaRef.current = 0;
        if(!mountedRef.current || queued === 0) return;

        setOffset((prev) => {
          const limit = maxOffsetRef.current;
          const currentStart = Math.min(prev, limit);
          return Math.max(0, Math.min(currentStart + queued, limit));
        });
      });
    }
  }, { isActive: keyboardActive });

  const placeholder = useMemo(
    () => (visibleCount > 0 ? ` ${"\n".repeat(Math.max(0, visibleCount - 1))}` : ""),
    [visibleCount],
  );

  const transformLine = useCallback((_line: string, index: number) => {
    const rawLine = textLines?.[start + index] ?? "";
    if(!rawLine) return "";
    return bgWrapEnabled ? `\x1b[48;2;17;17;17m${rawLine}\x1b[49m` : rawLine;
  }, [start, textLines]);

  const titleRow = useMemo(() => (
    <Box marginTop={1} height={1} justifyContent="space-between">
      <Text color={colors.text} bold wrap="truncate-end">{title}</Text>
      {subtitle}
    </Box>
  ), [subtitle, title]);

  const headerRows = useMemo(() => header?.map((line, index) => (
    <Box key={`header-${index}`} height={1}>
      {line}
    </Box>
  )), [header]);

  const scrollHint = useMemo(
    () => (!selectable && maxOffset > 0 ? <Text color={colors.muted}>↑↓ 滚动 · PgUp/PgDn</Text> : <Box/>),
    [maxOffset, selectable],
  );

  return (
    <Box flexDirection="column" height={visibleCount + 4 + headerHeight} flexShrink={0}>
      {titleRow}
      {headerRows}
      <Box flexDirection="column" height={visibleCount}>
        {textLines ? (
          visibleCount > 0 && <Transform transform={transformLine}>{placeholder}</Transform>
        ) : (
          lines?.slice(start, start + visibleCount).map((line, index) => (
            <Box key={start + index} height={1}>
              {line}
            </Box>
          ))
        )}
      </Box>
      <Box marginTop={1} height={1} justifyContent="space-between">
        {scrollHint}
        {maxOffset > 0 && <Text color={colors.muted}>{`${start + 1}-${start + visibleCount}/${totalLines}`}</Text>}
      </Box>
    </Box>
  );
});
