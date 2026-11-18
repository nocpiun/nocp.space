import { memo, useMemo, type ReactNode } from "react";
import { Box, Text } from "ink";
import { TerminalLink as Link } from "../components/link.js";
import { siteUrl } from "@nocp/shared";
import { ScrollPage } from "../components/scroll-page.js";
import { colors } from "../theme.js";

const donateUrl = `${siteUrl}/donate`;

// ISO/IEC 18004 QR Code (Version 2-M, 25x25) for https://nocp.space/donate
const donateQrRows = [
  "█▀▀▀▀▀█  ▄ ▀▀ ▄▄█ █▀▀▀▀▀█",
  "█ ███ █ █▀█ ▄▄▀▄  █ ███ █",
  "█ ▀▀▀ █ █ █▄██▄▄█ █ ▀▀▀ █",
  "▀▀▀▀▀▀▀ █▄▀ █ █▄▀ ▀▀▀▀▀▀▀",
  "█▄█▀█▀▀▄▄▀█▀▄▀▀▀▄ ▀█▀▀▀▄ ",
  "▀ █▄▀▄▀▄▀███  ▀█ █ ▄█▀ ▀█",
  "█ ███▀▀▀▀▀▄ ▀█▀▀█▀▀▄▀▄▀█▀",
  "█ ▄ ▀▀▀██▀▄█▀▀█▀▀▄▀██▀ ▀█",
  "▀  ▀▀ ▀▀▄█▄▀██▀▀█▀▀▀█▄▀  ",
  "█▀▀▀▀▀█ ▄    ▀▀ █ ▀ █▄▀██",
  "█ ███ █ █▄█▄▀▀▀████▀█▄█▄▄",
  "█ ▀▀▀ █ ▀▄▀ ▀ ▄▄█▀▄▄▄█▀ █",
  "▀▀▀▀▀▀▀ ▀ ▀  ▀▀▀  ▀▀▀▀▀▀▀",
] as const;

const qrInnerPaddingX = 1;
const qrInnerWidth = donateQrRows[0].length + qrInnerPaddingX * 2;
const qrHorizontalLine = "─".repeat(qrInnerWidth);
const qrSidePad = " ".repeat(qrInnerPaddingX);

type DonatePageProps = {
  width: number;
  maxHeight: number;
  keyboardActive: boolean;
};

export const DonatePage = memo(function DonatePage({
  width,
  maxHeight,
  keyboardActive,
}: DonatePageProps) {
  const lines = useMemo(() => {
    const introTexts = width >= 68
      ? ["打赏能给予我创造和开发的动力，如果你对我的项目感到满意，欢迎打赏！"]
      : width >= 38
        ? ["打赏能给予我创造和开发的动力，", "如果你对我的项目感到满意，欢迎打赏！"]
        : ["打赏能给予我创造和开发的动力，", "如果你对我的项目感到满意，", "欢迎打赏！"];

    const centered = (node: ReactNode) => (
      <Box width={width} height={1} justifyContent="center">
        {node}
      </Box>
    );

    const builtLines: ReactNode[] = [];
    if(maxHeight >= 24) builtLines.push(null);

    for(const text of introTexts) {
      builtLines.push(centered(<Text color={colors.secondary} wrap="truncate-end">{text}</Text>));
    }

    if(maxHeight >= 22) builtLines.push(null);

    builtLines.push(centered(<Text color={colors.border}>{`┌${qrHorizontalLine}┐`}</Text>));

    for(const row of donateQrRows) {
      builtLines.push(centered(
        <Text backgroundColor={colors.card}>
          <Text color={colors.border}>{`│${qrSidePad}`}</Text>
          <Text color="#ffffff">{row}</Text>
          <Text color={colors.border}>{`${qrSidePad}│`}</Text>
        </Text>
      ));
    }

    builtLines.push(
      centered(<Text color={colors.border}>{`└${qrHorizontalLine}┘`}</Text>),
      centered(<Text color={colors.muted} wrap="truncate-end">微信扫码前往网页端识别赞赏码</Text>)
    );

    return builtLines;
  }, [maxHeight, width]);

  return (
    <ScrollPage
      title="打赏"
      subtitle={(
        <Link url={donateUrl}>
          <Text color={colors.muted}>nocp.space/donate</Text>
        </Link>
      )}
      lines={lines}
      maxHeight={maxHeight}
      keyboardActive={keyboardActive}/>
  );
});
