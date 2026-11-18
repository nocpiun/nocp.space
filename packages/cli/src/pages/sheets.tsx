import { memo, useMemo, type ReactNode } from "react";
import { Box, Text } from "ink";
import Link from "ink-link";
import { sheets, siteUrl } from "@nocp/shared";
import { ScrollPage, type LineRange } from "../scroll-page.js";
import { colors } from "../theme.js";

export function sheetUrl(src: string): string {
  return `${siteUrl}/sheets/${src}`;
}

type SheetsPageProps = {
  width: number;
  maxHeight: number;
  selectedIndex: number;
  keyboardActive: boolean;
  onSelect: (index: number) => void;
};

export const SheetsPage = memo(function SheetsPage({
  width,
  maxHeight,
  selectedIndex,
  keyboardActive,
  onSelect,
}: SheetsPageProps) {
  const wide = width >= 58;

  const { lines, itemRanges } = useMemo(() => {
    const builtLines: ReactNode[] = [];
    const ranges: LineRange[] = [];

    for(let index = 0; index < sheets.length; index++) {
      const item = sheets[index];
      const selected = index === selectedIndex;
      const meta = wide
        ? `${item.author} · ${item.tune}调 · 变调夹${item.capo}品`
        : `${item.author} · ${item.tune}调`;

      if(wide) {
        const lineIndex = builtLines.length;
        builtLines.push(
          <Box width={width} height={1} justifyContent="space-between">
            <Box flexShrink={0}>
              <Link url={sheetUrl(item.src)} fallback={false}>
                <Text
                  color={selected ? colors.card : colors.text}
                  backgroundColor={selected ? colors.text : colors.card}
                  bold={selected}
                  wrap="truncate-end">
                  {` ${item.name} `}
                </Text>
              </Link>
            </Box>
            <Box flexGrow={1} marginLeft={2} justifyContent="flex-end">
              <Text color={selected ? colors.secondary : colors.muted} wrap="truncate-end">
                {meta}
              </Text>
            </Box>
          </Box>
        );
        ranges.push({ start: lineIndex, end: lineIndex });
      } else {
        const startLine = builtLines.length;
        builtLines.push(
          <Box width={width} height={1}>
            <Link url={sheetUrl(item.src)} fallback={false}>
              <Text
                color={selected ? colors.card : colors.text}
                backgroundColor={selected ? colors.text : colors.card}
                bold={selected}
                wrap="truncate-end">
                {` ${item.name} `}
              </Text>
            </Link>
          </Box>,
          <Box width={width} height={1}>
            <Text color={selected ? colors.secondary : colors.muted} wrap="truncate-end">
              {` ${meta}`}
            </Text>
          </Box>
        );
        ranges.push({ start: startLine, end: startLine + 1 });
      }
    }

    return { lines: builtLines, itemRanges: ranges };
  }, [selectedIndex, wide, width]);

  return (
    <ScrollPage
      title="曲谱"
      subtitle={<Text color={colors.muted}>{`共 ${sheets.length} 首 · Enter 打开网页`}</Text>}
      lines={lines}
      maxHeight={maxHeight}
      keyboardActive={keyboardActive}
      selectedIndex={selectedIndex}
      itemRanges={itemRanges}
      onSelect={onSelect}/>
  );
});
