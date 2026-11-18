import { memo, useMemo, type ReactNode } from "react";
import { Box, Text } from "ink";
import Link from "ink-link";
import {
  siteDescription,
  siteIcon,
  siteName,
  siteThemeColor,
  siteUrl,
  type FriendLink,
} from "@nocp/shared";
import { RemoteStatusPage, useCliData } from "../api.js";
import { ScrollPage, type LineRange } from "../scroll-page.js";
import { colors } from "../theme.js";

export const linksApiPath = "/api/cli/links";

function formatHost(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "");
  }
}

type SiteInfoRowProps = {
  label: string;
  value: string;
  url?: string;
  color?: string;
  backgroundColor?: string;
  width: number;
};

function SiteInfoRow({ label, value, url, color = colors.muted, backgroundColor, width }: SiteInfoRowProps) {
  return (
    <Box width={width} height={1}>
      <Box width={8} flexShrink={0}>
        <Text color={colors.secondary}>{label}</Text>
      </Box>
      <Box flexGrow={1}>
        {url ? (
          <Link url={url} fallback={false}>
            <Text color={color} backgroundColor={backgroundColor} wrap="truncate-end">{value}</Text>
          </Link>
        ) : (
          <Text color={color} backgroundColor={backgroundColor} wrap="truncate-end">{value}</Text>
        )}
      </Box>
    </Box>
  );
}

type LinksPageProps = {
  width: number;
  maxHeight: number;
  selectedIndex: number;
  keyboardActive: boolean;
  onSelect: (index: number) => void;
};

export const LinksPage = memo(function LinksPage({
  width,
  maxHeight,
  selectedIndex,
  keyboardActive,
  onSelect,
}: LinksPageProps) {
  const { data: links, loading, error, reload } = useCliData<FriendLink[]>(linksApiPath);
  const wide = width >= 64;
  const hostWidth = width >= 78 ? 20 : 16;

  const { lines, itemRanges } = useMemo(() => {
    const list = links ?? [];
    const builtLines: ReactNode[] = [];
    const ranges: LineRange[] = [];

    for(let index = 0; index < list.length; index++) {
      const item = list[index];
      const selected = index === selectedIndex;
      const host = formatHost(item.url);

      if(wide) {
        const lineIndex = builtLines.length;
        builtLines.push(
          <Box width={width} height={1}>
            <Box width={20} marginRight={2} flexShrink={0}>
              <Link url={item.url} fallback={false}>
                <Text
                  color={selected ? colors.card : colors.text}
                  backgroundColor={selected ? colors.text : colors.card}
                  bold={selected}
                  wrap="truncate-end">
                  {` ${item.name} `}
                </Text>
              </Link>
            </Box>
            <Box flexGrow={1} marginRight={2}>
              <Text color={selected ? colors.text : colors.muted} wrap="truncate-end">
                {item.description}
              </Text>
            </Box>
            <Box width={hostWidth} flexShrink={0} justifyContent="flex-end">
              <Text color={selected ? colors.secondary : colors.muted} wrap="truncate-end">
                {host}
              </Text>
            </Box>
          </Box>
        );
        ranges.push({ start: lineIndex, end: lineIndex });
      } else {
        const startLine = builtLines.length;
        builtLines.push(
          <Box width={width} height={1} justifyContent="space-between">
            <Box flexShrink={0}>
              <Link url={item.url} fallback={false}>
                <Text
                  color={selected ? colors.card : colors.text}
                  backgroundColor={selected ? colors.text : colors.card}
                  bold={selected}
                  wrap="truncate-end">
                  {` ${item.name} `}
                </Text>
              </Link>
            </Box>
            <Box flexGrow={1} marginLeft={1} justifyContent="flex-end">
              <Text color={colors.muted} wrap="truncate-end">{host}</Text>
            </Box>
          </Box>,
          <Box width={width} height={1}>
            <Text color={selected ? colors.secondary : colors.muted} wrap="truncate-end">
              {` ${item.description}`}
            </Text>
          </Box>
        );
        ranges.push({ start: startLine, end: startLine + 1 });
      }
    }

    builtLines.push(
      null,
      <Text color={colors.secondary} bold>本站信息</Text>,
      <SiteInfoRow label="名称" value={siteName} width={width}/>,
      <SiteInfoRow label="简介" value={siteDescription} width={width}/>,
      <SiteInfoRow label="URL" value={siteUrl} url={siteUrl} width={width}/>,
      <SiteInfoRow label="图标" value={siteIcon} url={siteIcon} width={width}/>,
      <SiteInfoRow label="颜色" value={siteThemeColor} color="#ffffff" backgroundColor={siteThemeColor} width={width}/>,
      <Text color={colors.muted} wrap="truncate-end">欢迎前往网页端留言交换友链 😉</Text>
    );

    return { lines: builtLines, itemRanges: ranges };
  }, [hostWidth, links, selectedIndex, wide, width]);

  if(!links) {
    return (
      <RemoteStatusPage
        title="友情链接"
        maxHeight={maxHeight}
        loading={loading}
        error={error}
        keyboardActive={keyboardActive}
        onRetry={reload}/>
    );
  }

  return (
    <ScrollPage
      title="友情链接"
      subtitle={<Text color={colors.muted}>{`共 ${links.length} 位`}</Text>}
      lines={lines}
      maxHeight={maxHeight}
      keyboardActive={keyboardActive}
      selectedIndex={selectedIndex}
      itemRanges={itemRanges}
      onSelect={onSelect}/>
  );
});
