import { memo, useMemo, type ReactNode } from "react";
import { Box, Text } from "ink";
import Link from "ink-link";
import { featuredProjects, projects } from "@nocp/shared";
import { ScrollPage, type LineRange } from "../scroll-page.js";
import { colors } from "../theme.js";

function stripHtml(text: string): string {
  return text.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "");
}

function formatHost(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "");
  }
}

export type ProjectEntry = {
  name: string;
  description: string;
  openUrl: string;
  meta: string;
  shortMeta: string;
  featured: boolean;
};

export const projectEntries: readonly ProjectEntry[] = [
  ...featuredProjects.map((item) => {
    const host = formatHost(item.url);
    return {
      name: item.name,
      description: stripHtml(item.description),
      openUrl: item.url,
      meta: item.repo ? `${host} · ${item.repo}` : host,
      shortMeta: host,
      featured: true,
    };
  }),
  ...projects.map((item) => ({
    name: item.name,
    description: stripHtml(item.description),
    openUrl: item.url ?? `https://github.com/${item.repo}`,
    meta: `${item.repo} · ${item.year}`,
    shortMeta: String(item.year),
    featured: false,
  })),
];

type ProjectsPageProps = {
  width: number;
  maxHeight: number;
  selectedIndex: number;
  keyboardActive: boolean;
  onSelect: (index: number) => void;
};

export const ProjectsPage = memo(function ProjectsPage({
  width,
  maxHeight,
  selectedIndex,
  keyboardActive,
  onSelect,
}: ProjectsPageProps) {
  const showFullMeta = width >= 50;

  const { lines, itemRanges } = useMemo(() => {
    const builtLines: ReactNode[] = [];
    const ranges: LineRange[] = [];
    let inOtherSection = false;

    builtLines.push(<Text color={colors.secondary} bold>精选项目</Text>);

    for(let index = 0; index < projectEntries.length; index++) {
      const entry = projectEntries[index];
      let sectionHeaderLine: number | undefined;
      if(index === 0) {
        sectionHeaderLine = 0;
      } else if(!entry.featured && !inOtherSection) {
        inOtherSection = true;
        builtLines.push(null);
        sectionHeaderLine = builtLines.length;
        builtLines.push(<Text color={colors.secondary} bold>其他项目</Text>);
      }

      const selected = index === selectedIndex;
      const startLine = builtLines.length;

      builtLines.push(
        <Box width={width} height={1} justifyContent="space-between">
          <Box flexShrink={0}>
            <Link url={entry.openUrl} fallback={false}>
              <Text
                color={selected ? colors.card : colors.text}
                backgroundColor={selected ? colors.text : colors.card}
                bold={selected}
                wrap="truncate-end">
                {` ${entry.name} `}
              </Text>
            </Link>
          </Box>
          <Box flexGrow={1} marginLeft={2} justifyContent="flex-end">
            <Text color={selected ? colors.secondary : colors.muted} wrap="truncate-end">
              {showFullMeta ? entry.meta : entry.shortMeta}
            </Text>
          </Box>
        </Box>,
        <Box width={width} height={1}>
          <Text color={selected ? colors.secondary : colors.muted} wrap="truncate-end">
            {` ${entry.description}`}
          </Text>
        </Box>
      );

      ranges.push({ start: sectionHeaderLine ?? startLine, end: startLine + 1 });
    }

    return { lines: builtLines, itemRanges: ranges };
  }, [selectedIndex, showFullMeta, width]);

  return (
    <ScrollPage
      title="项目列表"
      subtitle={<Text color={colors.muted}>{`共 ${projectEntries.length} 个`}</Text>}
      lines={lines}
      maxHeight={maxHeight}
      keyboardActive={keyboardActive}
      selectedIndex={selectedIndex}
      itemRanges={itemRanges}
      onSelect={onSelect}/>
  );
});
