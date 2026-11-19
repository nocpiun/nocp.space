import { memo } from "react";
import { Box, Text } from "ink";
import { TerminalLink as Link } from "../components/link.js";
import { profileLinks } from "../profile.js";
import { colors } from "../theme.js";

const logo = [
  "  _  _            _         _    ",
  " | \\| |___ _ _ __| |___ ___| |_  ",
  " | .` / _ \\ '_/ _| / -_) -_) ' \\ ",
  " |_|\\_\\___/_| \\__|_\\___\\___|_||_|",
].join("\n");

const logoWidth = Math.max(...logo.split("\n").map((line) => line.length));

type HomePageProps = {
  columns: number;
  rows: number;
  width: number;
  selectedLink: number;
  linkMessage: string;
};

export const HomePage = memo(function HomePage({ columns, rows, width, selectedLink, linkMessage }: HomePageProps) {
  const compact = rows < 34 || columns < 62;
  const sideBySide = rows < 34 && columns >= 78;
  const smallLogo = !sideBySide && rows < 26 && columns < 62;
  const profileWidth = width - logoWidth - 3;

  return (
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
                <Link url={link.url}>
                  <Text
                    color={selected ? colors.onAccent : colors.secondary}
                    backgroundColor={selected ? colors.accent : colors.card}
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
  );
});
