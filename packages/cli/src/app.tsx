import { useMemo, useState } from "react";
import { Box, Text, useInput, useWindowSize } from "ink";
import Link from "ink-link";
import open from "open";
import { CommandInput } from "./command-input.js";
import { homeCommands, type Command } from "./commands.js";
import { profileLinks } from "./profile.js";

const logo = [
  "  _  _            _         _    ",
  " | \\| |___ _ _ __| |___ ___| |_  ",
  " | .` / _ \\ '_/ _| / -_) -_) ' \\ ",
  " |_|\\_\\___/_| \\__|_\\___\\___|_||_|",
].join("\n");

const maxVisibleCommands = 6;
const initialSelection = { index: 0, start: 0 };

const logoWidth = Math.max(...logo.split("\n").map(line => line.length));

async function openExternalUrl(url: string) {
  await open(url);
}

type AppProps = {
  interactive: boolean;
  openLink?: (url: string) => Promise<void>;
  commands?: readonly Command[];
};

const colors = {
  background: "#0b0b0b",
  card: "#111111",
  border: "#484848",
  text: "#ededed",
  secondary: "#a0a0a0",
  muted: "#777777",
};

export function App({ interactive, openLink = openExternalUrl, commands = homeCommands }: AppProps) {
  const { columns, rows } = useWindowSize();
  // Keep the last terminal row free so Windows can use incremental rendering.
  const viewportHeight = Math.max(1, rows - 1);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [selectedLink, setSelectedLink] = useState(0);
  const [linkMessage, setLinkMessage] = useState("");
  const [openingLink, setOpeningLink] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [selection, setSelection] = useState(initialSelection);
  const [completionRevision, setCompletionRevision] = useState(0);
  const compact = rows < 34 || columns < 62;
  const sideBySide = rows < 34 && columns >= 78;
  const smallLogo = !sideBySide && rows < 26 && columns < 62;
  const cardWidth = Math.min(92, columns - 4);
  const cardPadding = cardWidth >= 60 ? 3 : 1;
  const profileWidth = cardWidth - 2 - cardPadding * 2 - logoWidth - 3;
  const minimumRows = sideBySide ? 21 : 23;
  const tooSmall = columns < 42 || rows < minimumRows;
  const query = value.trim().toLowerCase();
  const matchingCommands = commands.filter(command => command.name.startsWith(query));
  const visibleCommands = matchingCommands.slice(selection.start, selection.start + maxVisibleCommands);
  const selectedCommand = commandMenuOpen ? matchingCommands[selection.index] : undefined;
  const tabHint = commandMenuOpen ? "Tab 补全" : "Tab 命令";
  const inputHint = columns < 54
    ? "Shift+Tab 切换选择"
    : columns < 78
      ? `${tabHint} · Shift+Tab 切换选择`
      : `↑/↓ 选择 · ${tabHint} · Enter 确认 · Shift+Tab 切换选择`;

  const homeHeader = useMemo(() => (
    <Box
      flexDirection={sideBySide ? "row" : "column"}
      alignItems={sideBySide ? "center" : "stretch"}
      marginTop={sideBySide && rows >= 24 ? 1 : 0}>
      <Box
        width={sideBySide ? logoWidth : undefined}
        flexShrink={0}
        justifyContent="center"
        marginRight={sideBySide ? 3 : 0}
        marginY={compact ? 0 : 1}>
        <Text color={colors.text}>{smallLogo ? "Norcleeh" : logo}</Text>
      </Box>

      <Box
        width={sideBySide ? profileWidth : undefined}
        flexDirection="column"
        alignItems={sideBySide ? "flex-start" : "center"}
        marginTop={compact ? 0 : 1}
        marginBottom={compact ? 0 : 2}>
        <Text color={colors.text} bold italic>Code the future.</Text>
        <Box flexDirection="column" alignItems={sideBySide ? "flex-start" : "center"} marginTop={compact ? 0 : 1}>
          {sideBySide ? (
            <>
              <Text color={colors.secondary}>我是一个热爱代码、开源、音乐</Text>
              <Text color={colors.secondary}>和 Minecraft 的学生，</Text>
            </>
          ) : (
            <Text color={colors.secondary}>我是一个热爱代码、开源、音乐和Minecraft的学生，</Text>
          )}
          <Text color={colors.secondary}>很高兴能见到你！</Text>
        </Box>
        <Box justifyContent={sideBySide ? "flex-start" : "center"} flexWrap="wrap" marginTop={compact ? 0 : 1}>
          {profileLinks.map((link, index) => {
            const selected = selectedLink === index;

            return (
              <Box key={link.label} marginRight={1} aria-label={`${selected ? "已选择，" : ""}打开 ${link.label}`}>
                <Link url={link.url} fallback={false}>
                  <Text
                    color={selected ? colors.card : colors.secondary}
                    backgroundColor={selected ? colors.text : colors.card}
                    bold={selected}>
                    {` ${link.label} `}
                  </Text>
                </Link>
              </Box>
            );
          })}
        </Box>
        <Box width="100%" height={1} justifyContent={sideBySide ? "flex-start" : "center"}>
          <Text color={colors.muted} wrap="truncate-end">
            {linkMessage}
          </Text>
        </Box>
      </Box>
    </Box>
  ), [sideBySide, compact, smallLogo, rows, profileWidth, selectedLink, linkMessage]);

  useInput((input, key) => {
    if(key.escape) {
      setCommandMenuOpen(false);
      return;
    }

    if(tooSmall) return;

    if(key.ctrl && input === "o") {
      void activateLink(selectedLink);
      return;
    }

    if(!key.ctrl && !key.meta && input.includes("/")) {
      setCommandMenuOpen(true);
      setSelection(initialSelection);
    }

    if(key.tab) {
      if(key.shift) {
        setSelectedLink(index => (index + 1) % profileLinks.length);
        setLinkMessage("");
        return;
      }

      if(!commandMenuOpen) {
        setCommandMenuOpen(true);
        setSelection(initialSelection);
        setMessage("");
        return;
      }

      const completion = selectedCommand ?? matchingCommands[0];
      if(completion) {
        setValue(completion.name);
        setSelection(initialSelection);
        // Remount after completion so the input cursor moves to the new end.
        setCompletionRevision(revision => revision + 1);
      }
      setMessage("");
      return;
    }

    if(key.upArrow || key.downArrow) {
      if(!commandMenuOpen) return;
      setMessage("");
      if(matchingCommands.length === 0) return;
      const count = matchingCommands.length;
      const index = (selection.index + (key.upArrow ? -1 : 1) + count) % count;
      let start = selection.start;
      // Scroll at the second or penultimate visible item, leaving room ahead.
      if(index <= start + 1) start = index - 2;
      else if(index >= start + maxVisibleCommands - 2) start = index - maxVisibleCommands + 3;
      start = Math.max(0, Math.min(start, count - maxVisibleCommands));
      setSelection({ index, start });
    }
  }, { isActive: interactive });

  async function activateLink(index: number) {
    if(openingLink) return;

    const link = profileLinks[index];
    setOpeningLink(true);
    setLinkMessage(`正在打开 ${link.label}…`);
    try {
      await openLink(link.url);
      setLinkMessage(`已请求打开 ${link.label}`);
    } catch {
      setLinkMessage(`无法打开 ${link.label}，请检查默认应用后重试。`);
    } finally {
      setOpeningLink(false);
    }
  }

  function submit(input: string) {
    const command = selectedCommand ?? commands.find(item => item.name === input.trim().toLowerCase());
    if(!input.trim() && !command) return;

    setMessage(command
      ? `${command.name} · 敬请期待。`
      : "未知命令。");
    setValue("");
    setCommandMenuOpen(false);
    setSelection(initialSelection);
  }

  function changeInput(input: string) {
    setValue(input.replace(/[\r\n\t]/g, " ").slice(0, 128));
    setSelection(initialSelection);
    setMessage("");
  }

  if(tooSmall) {
    return (
      <Box width={columns} height={viewportHeight} flexDirection="column" justifyContent="center" alignItems="center">
        <Text bold>nocp.space</Text>
        <Text>请将终端扩大至 42 × 23 或 78 × 21。</Text>
        <Text dimColor>Ctrl+C 退出</Text>
      </Box>
    );
  }

  return (
    <Box
      width={columns}
      height={viewportHeight}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor={colors.background}>
      <Box
        width={cardWidth}
        flexDirection="column"
        borderStyle="single"
        borderColor={colors.border}
        borderBackgroundColor={colors.card}
        backgroundColor={colors.card}
        paddingX={cardPadding}
        paddingTop={compact ? 0 : 1}>
        <Box justifyContent="space-between">
          <Text color={colors.secondary}>nocp.space</Text>
          <Text color={colors.muted}>~/</Text>
        </Box>

        {homeHeader}

        {commandMenuOpen && (
          <Box flexDirection="column">
            {matchingCommands.length === 0 && <Text color={colors.muted}>没有匹配的命令</Text>}
            {visibleCommands.map(command => {
              const selected = command === selectedCommand;

              return (
                <Box key={command.name} height={1}>
                  <Box width={2}>
                    <Text color={colors.text}>{selected ? "›" : " "}</Text>
                  </Box>
                  <Box width={14}>
                    <Text color={selected ? colors.text : colors.secondary} bold={selected}>
                      {command.name}
                    </Text>
                  </Box>
                  <Box flexGrow={1}>
                    <Text color={selected ? colors.secondary : colors.muted} wrap="truncate-end">
                      {command.description}
                    </Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}

        <Box position="relative" height={3} flexShrink={0} marginTop={compact ? 0 : 1}>
          <Box
            width="100%"
            borderStyle="round"
            borderColor={colors.secondary}
            borderBackgroundColor={colors.card}
            backgroundColor={colors.card}
            paddingX={0}>
            <Text color={colors.text}>{"> "}</Text>
            <Box flexGrow={1} height={1} overflow="hidden">
              <Text color={colors.text}>
                <CommandInput
                  key={completionRevision}
                  value={value}
                  placeholder="输入命令，例如 /help"
                  interactive={interactive}
                  onChange={changeInput}
                  onSubmit={submit}/>
              </Text>
            </Box>
          </Box>
          <Box position="absolute" bottom={0} right={2}>
            <Text color={colors.secondary} backgroundColor={colors.card}>
              {" Nocpiun "}
            </Text>
          </Box>
        </Box>

        <Box justifyContent="space-between" height={1}>
          <Box flexGrow={1} marginRight={1}>
            <Text color={colors.muted} wrap="truncate-end">
              {message || inputHint}
            </Text>
          </Box>
          <Box flexShrink={0}>
            <Text color={colors.muted}>Ctrl+C 退出</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
