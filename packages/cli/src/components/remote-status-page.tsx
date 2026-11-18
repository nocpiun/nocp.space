import { Box, Text, useInput } from "ink";
import { colors } from "../theme.js";
import { ScrollPage } from "./scroll-page.js";

type RemoteStatusPageProps = {
  title: string;
  maxHeight: number;
  loading: boolean;
  error: string | null;
  keyboardActive: boolean;
  onRetry: () => void;
};

export function RemoteStatusPage({
  title,
  maxHeight,
  loading,
  error,
  keyboardActive,
  onRetry,
}: RemoteStatusPageProps) {
  useInput((input, key) => {
    if(key.ctrl && error && input.toLowerCase() === "r") {
      onRetry();
    }
  }, { isActive: keyboardActive && Boolean(error) });

  const lines = loading
    ? [
      null,
      <Box key="loading" height={1}>
        <Text color={colors.muted}>正在加载...</Text>
      </Box>,
    ]
    : [
      null,
      <Box key="error" height={1}>
        <Text color={colors.secondary}>{`加载失败：${error ?? "未知错误"}`}</Text>
      </Box>,
      <Box key="retry" height={1}>
        <Text color={colors.muted}>请检查网络后按 Ctrl+R 重试，或按 Esc 返回</Text>
      </Box>,
    ];

  return (
    <ScrollPage
      title={title}
      lines={lines}
      maxHeight={maxHeight}
      keyboardActive={keyboardActive}/>
  );
}
