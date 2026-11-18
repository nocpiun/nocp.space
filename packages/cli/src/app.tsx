import { useCallback, useState } from "react";
import { Box, Text, useInput, useWindowSize } from "ink";
import open from "open";
import {
  blogName,
  type ArticleSummary,
  type BlogListResponse,
  type FriendLink,
  type ProjectsResponse,
  type SheetItem,
} from "@nocp/shared";
import { peekCliCache } from "./api.js";
import { CommandInput } from "./command-input.js";
import { homeCommands, pagePaths, type Command, type Page } from "./commands.js";
import { ArticleListPage, notesApiPath, postsApiPath } from "./pages/article-list.js";
import { ArticlePage } from "./pages/article.js";
import { DonatePage } from "./pages/donate.js";
import { HelpPage } from "./pages/help.js";
import { HomePage } from "./pages/home.js";
import { linksApiPath, LinksPage } from "./pages/links.js";
import { buildProjectEntries, projectsApiPath, ProjectsPage } from "./pages/projects.js";
import { sheetsApiPath, SheetsPage, sheetUrl } from "./pages/sheets.js";
import { profileLinks } from "./profile.js";
import { colors } from "./theme.js";

const maxVisibleCommands = 6;
const initialSelection = { index: 0, start: 0 };

async function openExternalUrl(url: string) {
  await open(url);
}

type Route =
  | { page: Page }
  | { page: "article"; kind: "blog" | "notes"; slug: string };

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
  const [history, setHistory] = useState<Route[]>([{ page: initialPage }]);
  const route = history[history.length - 1];
  const page = route.page;
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [pageSelection, setPageSelection] = useState({
    home: 0,
    links: 0,
    projects: 0,
    sheets: 0,
    blog: 0,
    notes: 0,
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
  const pageHeight = viewportHeight - (compact ? 7 : 8) - menuHeight;
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

  const selectSheet = useCallback((index: number) => {
    setPageSelection((prev) => ({ ...prev, sheets: index }));
    setMessage("");
  }, []);

  const selectBlogPost = useCallback((index: number) => {
    setPageSelection((prev) => ({ ...prev, blog: index }));
    setMessage("");
  }, []);

  const selectNote = useCallback((index: number) => {
    setPageSelection((prev) => ({ ...prev, notes: index }));
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
      if((page !== "home" || commandMenuOpen) && message) setMessage("");
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

  function pushRoute(next: Route) {
    setHistory((previous) => {
      const top = previous[previous.length - 1];
      if(top.page === next.page && (top.page !== "article" || (next.page === "article" && top.kind === next.kind && top.slug === next.slug))) {
        return previous;
      }
      return [...previous, next];
    });
  }

  function goBack() {
    if(history.length === 1) {
      setMessage("已经是第一页。");
      return;
    }

    setHistory((previous) => (previous.length > 1 ? previous.slice(0, -1) : previous));
    resetInput();
  }

  function submit(input: string) {
    const trimmed = input.trim().toLowerCase();
    if(!trimmed && !commandMenuOpen) {
      if(page === "links") {
        const link = peekCliCache<FriendLink[]>(linksApiPath)?.[pageSelection.links];
        if(link) void openTarget(link.name, link.url, "status");
      } else if(page === "projects") {
        const data = peekCliCache<ProjectsResponse>(projectsApiPath);
        const project = data ? buildProjectEntries(data)[pageSelection.projects] : undefined;
        if(project) void openTarget(project.name, project.openUrl, "status");
      } else if(page === "sheets") {
        const sheet = peekCliCache<SheetItem[]>(sheetsApiPath)?.[pageSelection.sheets];
        if(sheet) void openTarget(sheet.name, sheetUrl(sheet.src), "status");
      } else if(page === "blog") {
        const post = peekCliCache<BlogListResponse>(postsApiPath)?.posts[pageSelection.blog];
        if(post) pushRoute({ page: "article", kind: "blog", slug: post.slug });
      } else if(page === "notes") {
        const note = peekCliCache<ArticleSummary[]>(notesApiPath)?.[pageSelection.notes];
        if(note) pushRoute({ page: "article", kind: "notes", slug: note.slug });
      }
      return;
    }

    const command = commands.find((item) => item.name === trimmed) ?? selectedCommand;
    if(!trimmed && !command) return;

    resetInput();
    if(command?.page) {
      pushRoute({ page: command.page });
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
    switch(route.page) {
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
      case "sheets":
        return (
          <SheetsPage
            width={contentWidth}
            maxHeight={pageHeight}
            selectedIndex={pageSelection.sheets}
            keyboardActive={keyboardActive}
            onSelect={selectSheet}/>
        );
      case "blog":
        return (
          <ArticleListPage
            key="blog"
            kind="blog"
            title={blogName}
            width={contentWidth}
            maxHeight={pageHeight}
            selectedIndex={pageSelection.blog}
            keyboardActive={keyboardActive}
            onSelect={selectBlogPost}/>
        );
      case "notes":
        return (
          <ArticleListPage
            key="notes"
            kind="notes"
            title="笔记"
            width={contentWidth}
            maxHeight={pageHeight}
            selectedIndex={pageSelection.notes}
            keyboardActive={keyboardActive}
            onSelect={selectNote}/>
        );
      case "article":
        return (
          <ArticlePage
            key={`${route.kind}:${route.slug}`}
            kind={route.kind}
            slug={route.slug}
            width={contentWidth}
            maxHeight={pageHeight}
            keyboardActive={keyboardActive}/>
        );
    }
  }

  const headerPath = route.page === "article"
    ? `~/${route.kind}/${route.slug}`
    : pagePaths[route.page];

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
          <Text color={colors.muted}>{headerPath}</Text>
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

        <Box position="relative" height={3} flexShrink={0}>
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
