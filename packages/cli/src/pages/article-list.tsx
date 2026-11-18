import { memo, useMemo, type ReactNode } from "react";
import { Box, Text } from "ink";
import { recommendedPosts } from "@nocp/shared";
import type { ArticleEntry } from "virtual:nocp-content";
import { ScrollPage, type LineRange } from "../scroll-page.js";
import { colors } from "../theme.js";

const recommendedSet = new Set(recommendedPosts);

type ArticleListPageProps = {
  title: string;
  entries: readonly ArticleEntry[];
  unit: string;
  showRecommended?: boolean;
  width: number;
  maxHeight: number;
  selectedIndex: number;
  keyboardActive: boolean;
  onSelect: (index: number) => void;
};

export const ArticleListPage = memo(function ArticleListPage({
  title,
  entries,
  unit,
  showRecommended = false,
  width,
  maxHeight,
  selectedIndex,
  keyboardActive,
  onSelect,
}: ArticleListPageProps) {
  const showTags = width >= 54;

  const { lines, itemRanges } = useMemo(() => {
    const builtLines: ReactNode[] = [];
    const ranges: LineRange[] = [];

    for(let index = 0; index < entries.length; index++) {
      const entry = entries[index];
      const selected = index === selectedIndex;
      const startLine = builtLines.length;
      const star = showRecommended && recommendedSet.has(entry.title) ? "★ " : "";
      const tagsText = entry.tags.slice(0, 3).map((tag) => `#${tag}`).join(" ");
      const secondLine = entry.excerpt
        ? entry.excerpt
        : (tagsText || entry.author);

      builtLines.push(
        <Box width={width} height={1} justifyContent="space-between">
          <Box flexGrow={1} marginRight={2}>
            <Text
              color={selected ? colors.card : colors.text}
              backgroundColor={selected ? colors.text : colors.card}
              bold={selected}
              wrap="truncate-end">
              {` ${star}${entry.title} `}
            </Text>
          </Box>
          <Box flexShrink={0}>
            <Text color={selected ? colors.secondary : colors.muted}>
              {showTags && entry.excerpt && tagsText ? `${tagsText} · ${entry.date}` : entry.date}
            </Text>
          </Box>
        </Box>,
        <Box width={width} height={1}>
          <Text color={selected ? colors.secondary : colors.muted} wrap="truncate-end">
            {` ${secondLine}`}
          </Text>
        </Box>
      );

      ranges.push({ start: startLine, end: startLine + 1 });
    }

    return { lines: builtLines, itemRanges: ranges };
  }, [entries, selectedIndex, showRecommended, showTags, width]);

  return (
    <ScrollPage
      title={title}
      subtitle={<Text color={colors.muted}>{`共 ${entries.length} ${unit} · Enter 阅读`}</Text>}
      lines={lines}
      maxHeight={maxHeight}
      keyboardActive={keyboardActive}
      selectedIndex={selectedIndex}
      itemRanges={itemRanges}
      onSelect={onSelect}/>
  );
});
