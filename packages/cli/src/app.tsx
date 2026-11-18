import { useCallback, useState } from "react";
import { Box, Text, useInput, useWindowSize } from "ink";
import open from "open";
import { friendLinks } from "@nocp/shared";
import { CommandInput } from "./command-input.js";
import { homeCommands, pagePaths, type Command, type Page } from "./commands.js";
import { DonatePage } from "./pages/donate.js";
import { HelpPage } from "./pages/help.js";
import { HomePage } from "./pages/home.js";
import { LinksPage } from "./pages/links.js";
import { projectEntries, ProjectsPage } from "./pages/projects.js";
import { profileLinks } from "./profile.js";
import { colors } from "./theme.js";

const maxVisibleCommands = 6;
const initialSelection = { index: 0, start: 0 };

async function openExternalUrl(url: string) {
  await open(url);
}

type AppProps = {
  interactive: boolean;
  openLink?: (url: string) => Promise<void>;
  commands?: readonly Command[];
  initialPage?: Page;
};

export function App({
  interactive,
  openLink = openExternalUrl,
  commands = homeCommands,
  initialPage = "home",
}: AppProps) {
  const { columns, rows } = useWindowSize();
  // Keep the last terminal row free so Windows can use incremental rendering.
  const viewportHeight = Math.max(1, rows - 1);
  const [history, setHistory] = useState<Page[]>([initialPage]);
  const page = history[history.length - 1];
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [pageSelection, setPageSelection] = useState({
    home: 0,
    links: 0,
    projects: 0,
  });
  const [linkMessage, setLinkMessage] = useState("");
  const [openingLink, setOpeningLink] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [selection, setSelection] = useState(initialSelection);
  const [completionRevision, setCompletionRevision] = useState(0);
  const compact = rows < 34 || columns < 62;
  const cardWidth = Math.min(92, columns - 4);
  const cardPadding = cardWidth >= 60 ? 3 : 1;
  const contentWidth = cardWidth - 2 - cardPadding * 2;
  const minimumRows = columns >= 78 ? 21 : 23;
  const tooSmall = columns < 42 || rows < minimumRows;
  const query = value.trim().toLowerCase();
  const matchingCommands = commands.filter((command) => command.name.startsWith(query));
  const visibleCommands = matchingCommands.slice(selection.start, selection.start + maxVisibleCommands);
  const menuHeight = commandMenuOpen ? Math.max(1, visibleCommands.length) : 0;
  const pageHeight = viewportHeight - (compact ? 7 : 9) - menuHeight;
  const selectedCommand = commandMenuOpen ? matchingCommands[selection.index] : undefined;
  const keyboardActive = interactive && !commandMenuOpen;
  const tabHint = commandMenuOpen ? "Tab 补全" : "Tab 命令";
  const inputHint = page === "home"
    ? columns < 54
      ? "Shift+Tab 切换选择"
      : columns < 78
        ? `${tabHint} · Shift+Tab 切换选择`
        : `↑/↓ 选择 · ${tabHint} · Enter 确认 · Shift+Tab 切换选择`
    : columns < 54
      ? `${tabHint} · Esc 返回`
      : columns < 78
        ? `${tabHint} · Enter 确认 · Esc 返回`
        : `↑/↓ 选择 · ${tabHint} · Enter 确认 · Esc 返回`;

  const selectFriendLink = useCallback((index: number) => {
    setPageSelection((prev) => ({ ...prev, links: index }));
    setMessage("");
  }, []);

  const selectProject = useCallback((index: number) => {
    setPageSelection((prev) => ({ ...prev, projects: index }));
    setMessage("");
  }, []);

  useInput((input, key) => {
    if(key.escape) {
      if(commandMenuOpen) setCommandMenuOpen(false);
      else goBack();
      return;
    }

    if(tooSmall) return;

    if(key.ctrl && input === "o") {
      if(page === "home") {
        const link = profileLinks[pageSelection.home];
        if(link) void openTarget(link.label, link.url, "home");
      }
      return;
    }

    if(!key.ctrl && !key.meta && input.includes("/")) {
      setCommandMenuOpen(true);
      setSelection(initialSelection);
    }

    if(key.tab) {
      if(key.shift) {
        if(page === "home") {
          setPageSelection((prev) => ({ ...prev, home: (prev.home + 1) % profileLinks.length }));
          setLinkMessage("");
        }
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
        setCompletionRevision((revision) => revision + 1);
      }
      setMessage("");
      return;
    }

    if(key.upArrow || key.downArrow || key.pageUp || key.pageDown) {
      if(page !== "home" || commandMenuOpen) setMessage("");
      if(!commandMenuOpen || (!key.upArrow && !key.downArrow)) return;
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

  async function openTarget(label: string, url: string, channel: "home" | "status") {
    if(openingLink) return;

    const report = channel === "home" ? setLinkMessage : setMessage;
    setOpeningLink(true);
    report(`正在打开 ${label}…`);
    try {
      await openLink(url);
      report(`已打开 ${label}`);
    } catch {
      report(`无法打开 ${label}，请检查默认应用后重试。`);
    } finally {
      setOpeningLink(false);
    }
  }

  function resetInput() {
    setValue("");
    setMessage("");
    setCommandMenuOpen(false);
    setSelection(initialSelection);
  }

  function goBack() {
    if(history.length === 1) {
      setMessage("已经是第一页。");
      return;
    }

    setHistory((previous) => previous.length > 1 ? previous.slice(0, -1) : previous);
    resetInput();
  }

  function submit(input: string) {
    const trimmed = input.trim().toLowerCase();
    if(!trimmed && !commandMenuOpen) {
      if(page === "links") {
        const link = friendLinks[pageSelection.links];
        if(link) void openTarget(link.name, link.url, "status");
      } else if(page === "projects") {
        const project = projectEntries[pageSelection.projects];
        if(project) void openTarget(project.name, project.openUrl, "status");
      }
      return;
    }

    const command = commands.find((item) => item.name === trimmed) ?? selectedCommand;
    if(!trimmed && !command) return;

    resetInput();
    if(command?.page) {
      const nextPage = command.page;
      setHistory((previous) => previous[previous.length - 1] === nextPage ? previous : [...previous, nextPage]);
    } else if(command?.action === "back") {
      goBack();
    } else if(command?.url) {
      void openTarget(command.description, command.url, "status");
    } else {
      setMessage(command ? `${command.name} · 敬请期待。` : "未知命令。");
    }
  }

  function changeInput(input: string) {
    setValue(input.replace(/[\r\n\t]/g, " ").slice(0, 128));
    setSelection(initialSelection);
    setMessage("");
  }

  function renderPage() {
    switch(page) {
      case "home":
        return (
          <HomePage
            columns={columns}
            rows={rows}
            width={contentWidth}
            selectedLink={pageSelection.home}
            linkMessage={linkMessage}/>
        );
      case "help":
        return (
          <HelpPage
            commands={commands}
            width={contentWidth}
            maxHeight={pageHeight}
            keyboardActive={keyboardActive}/>
        );
      case "links":
        return (
          <LinksPage
            width={contentWidth}
            maxHeight={pageHeight}
            selectedIndex={pageSelection.links}
            keyboardActive={keyboardActive}
            onSelect={selectFriendLink}/>
        );
      case "donate":
        return (
          <DonatePage
            width={contentWidth}
            maxHeight={pageHeight}
            keyboardActive={keyboardActive}/>
        );
      case "projects":
        return (
          <ProjectsPage
            width={contentWidth}
            maxHeight={pageHeight}
            selectedIndex={pageSelection.projects}
            keyboardActive={keyboardActive}
            onSelect={selectProject}/>
        );
    }
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
          <Text color={colors.muted}>{pagePaths[page]}</Text>
        </Box>

        {renderPage()}

        {commandMenuOpen && (
          <Box flexDirection="column">
            {matchingCommands.length === 0 && <Text color={colors.muted}>没有匹配的命令</Text>}
            {visibleCommands.map((command) => {
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
                  maxWidth={Math.max(1, contentWidth - 4)}
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
