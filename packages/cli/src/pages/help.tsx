import { memo, useMemo, useState } from "react";
import { Box, Text, useInput } from "ink";
import type { Command } from "../commands.js";
import { colors } from "../theme.js";

type HelpLine = {
  label: string;
  description?: string;
  labelWidth?: number;
};

const shortcuts: HelpLine[] = [
  { label: "键盘操作" },
  { label: "Tab 或 /", description: "打开命令列表" },
  { label: "↑ / ↓", description: "选择命令 / 滚动帮助" },
  { label: "Tab", description: "补全选中的命令" },
  { label: "Enter", description: "执行命令" },
  { label: "Esc", description: "收起列表；否则返回" },
  { label: "Shift+Tab", description: "切换页面选中项" },
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
  const [offset, setOffset] = useState(0);
  const wide = width >= 64;
  const lines = useMemo(() => {
    const commandLines: HelpLine[] = [
      { label: "命令" },
      ...commands.map(command => ({
        label: command.name,
        description: command.description,
        labelWidth: 14,
      })),
    ];
    if(wide) {
      return Array.from({ length: Math.max(commandLines.length, shortcuts.length) }, (_, index) => ({
        left: commandLines[index],
        right: shortcuts[index],
      }));
    }
    return [...commandLines, { label: "" }, ...shortcuts].map(line => ({ left: line, right: undefined }));
  }, [commands, wide]);
  const visibleCount = Math.min(lines.length, Math.max(1, maxHeight - 3));
  const maxOffset = Math.max(0, lines.length - visibleCount);
  const start = Math.min(offset, maxOffset);

  useInput((_input, key) => {
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
      <Box marginTop={1} height={1}>
        <Text color={colors.text} bold>使用帮助</Text>
      </Box>
      <Box flexDirection="column" height={visibleCount}>
        {lines.slice(start, start + visibleCount).map((line, index) => (
          <Box key={start + index} height={1}>
            <Box width={wide ? Math.floor((width - 3) / 2) : width} marginRight={wide ? 3 : 0}>
              <HelpRow line={line.left}/>
            </Box>
            {wide && <Box flexGrow={1}><HelpRow line={line.right}/></Box>}
          </Box>
        ))}
      </Box>
      <Box height={1} justifyContent="space-between">
        {maxOffset > 0 && <Text color={colors.muted}>↑↓ 滚动 · PgUp/PgDn</Text>}
        {maxOffset > 0 && <Text color={colors.muted}>{`${start + 1}-${start + visibleCount}/${lines.length}`}</Text>}
      </Box>
    </Box>
  );
});
