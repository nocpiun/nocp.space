import { memo, useMemo } from "react";
import { Box, Text } from "ink";
import type { ArticleDetail } from "@nocp/shared";
import { RemoteStatusPage, useCliData } from "../api.js";
import { renderMarkdownLines } from "../markdown.js";
import { ScrollPage } from "../scroll-page.js";
import { colors } from "../theme.js";

type ArticlePageProps = {
  kind: "blog" | "notes";
  slug: string;
  width: number;
  maxHeight: number;
  keyboardActive: boolean;
};

export const ArticlePage = memo(function ArticlePage({
  kind,
  slug,
  width,
  maxHeight,
  keyboardActive,
}: ArticlePageProps) {
  const apiPath = `/api/cli/${kind === "blog" ? "posts" : "notes"}/${encodeURIComponent(slug)}`;
  const { data: entry, loading, error, reload } = useCliData<ArticleDetail>(apiPath);

  const header = useMemo(() => {
    if(!entry) return undefined;

    const tags = entry.tags.map((tag) => `#${tag}`).join(" ");
    const meta = [entry.author, entry.date, tags, entry.hasAI ? "AI 辅助" : ""]
      .filter(Boolean)
      .join(" · ");

    return [
      <Box key="meta" width={width} height={1}>
        <Text color={colors.muted} wrap="truncate-end">{meta}</Text>
      </Box>,
      <Text key="divider" color={colors.border}>{"─".repeat(Math.min(width, 40))}</Text>,
    ];
  }, [entry, width]);

  const lines = useMemo(() => {
    if(!entry) return [];
    return renderMarkdownLines(entry.content, width);
  }, [entry, width]);

  if(!entry) {
    return (
      <RemoteStatusPage
        title={slug}
        maxHeight={maxHeight}
        loading={loading}
        error={error}
        keyboardActive={keyboardActive}
        onRetry={reload}/>
    );
  }

  return (
    <ScrollPage
      title={entry.title}
      header={header}
      textLines={lines}
      maxHeight={maxHeight}
      keyboardActive={keyboardActive}/>
  );
});
