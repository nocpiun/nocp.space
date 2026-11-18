import { memo, useMemo } from "react";
import { Box, Text } from "ink";
import type { Command } from "../commands.js";
import { ScrollPage } from "../components/scroll-page.js";
import { colors } from "../theme.js";

type HelpLine = {
  label: string;
  description?: string;
  labelWidth?: number;
};

const shortcuts: HelpLine[] = [
  { label: "键盘操作" },
  { label: "Tab 或 /", description: "打开命令列表" },
  { label: "↑ / ↓", description: "选择 / 滚动页面" },
  { label: "Tab", description: "补全选中的命令" },
  { label: "Enter", description: "执行命令 / 打开选中项" },
  { label: "Esc", description: "收起列表；否则返回" },
  { label: "Shift+Tab", description: "切换首页选中链接" },
  { label: "Ctrl+O", description: "打开首页选中链接" },
  { label: "← / →", description: "移动输入光标" },
  { label: "Ctrl+C", description: "退出" },
];

function HelpRow({ line }: { line?: HelpLine }) {
  if(!line) return <Box height={1}/>;
  if(line.description === undefined) {
    return <Text color={colors.secondary} bold wrap="truncate-end">{line.label}</Text>;
  }

  return (
    <Box height={1}>
      <Box width={line.labelWidth ?? 12} flexShrink={0}>
        <Text color={colors.text}>{line.label}</Text>
      </Box>
      <Box flexGrow={1}>
        <Text color={colors.muted} wrap="truncate-end">{line.description}</Text>
      </Box>
    </Box>
  );
}

type HelpPageProps = {
  commands: readonly Command[];
  width: number;
  maxHeight: number;
  keyboardActive: boolean;
};

export const HelpPage = memo(function HelpPage({ commands, width, maxHeight, keyboardActive }: HelpPageProps) {
  const wide = width >= 64;
  const lines = useMemo(() => {
    const commandLines: HelpLine[] = [
      { label: "命令" },
      ...commands.map((command) => ({
        label: command.name,
        description: command.description,
        labelWidth: 14,
      })),
    ];
    const rows = wide
      ? Array.from({ length: Math.max(commandLines.length, shortcuts.length) }, (_, index) => ({
        left: commandLines[index],
        right: shortcuts[index],
      }))
      : [...commandLines, { label: "" }, ...shortcuts].map((line) => ({ left: line, right: undefined }));

    return rows.map((row, index) => (
      <Box key={index} width={width} height={1}>
        <Box width={wide ? Math.floor((width - 3) / 2) : width} marginRight={wide ? 3 : 0}>
          <HelpRow line={row.left}/>
        </Box>
        {wide && <Box flexGrow={1}><HelpRow line={row.right}/></Box>}
      </Box>
    ));
  }, [commands, wide, width]);

  return (
    <ScrollPage
      title="使用帮助"
      lines={lines}
      maxHeight={maxHeight}
      keyboardActive={keyboardActive}/>
  );
});
