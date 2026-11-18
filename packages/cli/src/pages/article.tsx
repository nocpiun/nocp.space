import { memo, useMemo, type ReactNode } from "react";
import { Box, Text } from "ink";
import Link from "ink-link";
import { siteUrl } from "@nocp/shared";
import type { ArticleEntry } from "virtual:nocp-content";
import { renderMarkdownLines } from "../markdown.js";
import { ScrollPage } from "../scroll-page.js";
import { colors } from "../theme.js";

type ArticlePageProps = {
  kind: "blog" | "notes";
  entry: ArticleEntry;
  width: number;
  maxHeight: number;
  keyboardActive: boolean;
};

export const ArticlePage = memo(function ArticlePage({
  kind,
  entry,
  width,
  maxHeight,
  keyboardActive,
}: ArticlePageProps) {
  const url = `${siteUrl}/${kind === "blog" ? "blog" : "blog/notes"}/${entry.slug}`;

  const lines = useMemo(() => {
    const tags = entry.tags.map((tag) => `#${tag}`).join(" ");
    const meta = [entry.author, entry.date, tags, entry.hasAI ? "AI 辅助" : ""]
      .filter(Boolean)
      .join(" · ");

    const builtLines: ReactNode[] = [
      <Box key="meta" width={width} height={1}>
        <Text color={colors.muted} wrap="truncate-end">{meta}</Text>
      </Box>,
      <Text key="divider" color={colors.border}>{"─".repeat(Math.min(width, 40))}</Text>,
      ...renderMarkdownLines(entry.content, width),
    ];

    return builtLines;
  }, [entry, width]);

  return (
    <ScrollPage
      title={entry.title}
      subtitle={(
        <Link url={url} fallback={false}>
          <Text color={colors.muted}>网页版</Text>
        </Link>
      )}
      lines={lines}
      maxHeight={maxHeight}
      keyboardActive={keyboardActive}/>
  );
});
