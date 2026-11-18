import { memo, useMemo, type ReactNode } from "react";
import { Box, Text } from "ink";
import type { ArticleSummary, BlogListResponse } from "@nocp/shared";
import { useCliData } from "../utils/api.js";
import { RemoteStatusPage } from "../components/remote-status-page.js";
import { ScrollPage, type LineRange } from "../components/scroll-page.js";
import { colors } from "../theme.js";

export const postsApiPath = "/api/cli/posts";
export const notesApiPath = "/api/cli/notes";

type ArticleListPageProps = {
  kind: "blog" | "notes";
  title: string;
  width: number;
  maxHeight: number;
  selectedIndex: number;
  keyboardActive: boolean;
  onSelect: (index: number) => void;
};

export const ArticleListPage = memo(function ArticleListPage({
  kind,
  title,
  width,
  maxHeight,
  selectedIndex,
  keyboardActive,
  onSelect,
}: ArticleListPageProps) {
  const apiPath = kind === "blog" ? postsApiPath : notesApiPath;
  const { data, loading, error, reload } = useCliData<BlogListResponse | ArticleSummary[]>(apiPath);
  const showTags = width >= 54;

  const { entries, recommendedSet } = useMemo(() => {
    if(!data) {
      return { entries: [] as readonly ArticleSummary[], recommendedSet: new Set<string>() };
    }
    if(Array.isArray(data)) {
      return { entries: data, recommendedSet: new Set<string>() };
    }
    return { entries: data.posts, recommendedSet: new Set(data.recommended) };
  }, [data]);

  const { lines, itemRanges } = useMemo(() => {
    const builtLines: ReactNode[] = [];
    const ranges: LineRange[] = [];

    for(let index = 0; index < entries.length; index++) {
      const entry = entries[index];
      const selected = index === selectedIndex;
      const startLine = builtLines.length;
      const star = recommendedSet.has(entry.title) ? "★ " : "";
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
  }, [entries, recommendedSet, selectedIndex, showTags, width]);

  if(!data) {
    return (
      <RemoteStatusPage
        title={title}
        maxHeight={maxHeight}
        loading={loading}
        error={error}
        keyboardActive={keyboardActive}
        onRetry={reload}/>
    );
  }

  return (
    <ScrollPage
      title={title}
      subtitle={<Text color={colors.muted}>{`共 ${entries.length} 篇 · Enter 阅读`}</Text>}
      lines={lines}
      maxHeight={maxHeight}
      keyboardActive={keyboardActive}
      selectedIndex={selectedIndex}
      itemRanges={itemRanges}
      onSelect={onSelect}/>
  );
});
