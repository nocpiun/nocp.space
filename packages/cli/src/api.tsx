import { useCallback, useEffect, useState } from "react";
import { Box, Text, useInput } from "ink";
import { siteUrl } from "@nocp/shared";
import { ScrollPage } from "./scroll-page.js";
import { colors } from "./theme.js";

const dataCache = new Map<string, unknown>();
const inFlight = new Map<string, Promise<unknown>>();

export function getApiBaseUrl(): string {
  return process.env.NOCP_API_URL?.replace(/\/+$/, "") || siteUrl;
}

export function peekCliCache<T>(path: string): T | undefined {
  return dataCache.get(path) as T | undefined;
}

export async function fetchCliData<T>(path: string): Promise<T> {
  if(dataCache.has(path)) {
    return dataCache.get(path) as T;
  }

  const pending = inFlight.get(path) as Promise<T> | undefined;
  if(pending) return pending;

  const request = (async () => {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      signal: AbortSignal.timeout(10_000),
      headers: { Accept: "application/json" },
    });
    if(!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = (await response.json()) as T;
    dataCache.set(path, payload);
    return payload;
  })();

  inFlight.set(path, request);
  try {
    return await request;
  } finally {
    inFlight.delete(path);
  }
}

export function useCliData<T>(path: string) {
  const [data, setData] = useState<T | undefined>(() => peekCliCache<T>(path));
  const [loading, setLoading] = useState(() => !dataCache.has(path));
  const [error, setError] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);

  const reload = useCallback(() => {
    dataCache.delete(path);
    setData(undefined);
    setError(null);
    setLoading(true);
    setRevision((value) => value + 1);
  }, [path]);

  useEffect(() => {
    const cached = peekCliCache<T>(path);
    if(cached !== undefined) {
      setData(cached);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setData(undefined);
    setLoading(true);
    setError(null);

    fetchCliData<T>(path)
      .then((result) => {
        if(cancelled) return;
        setData(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if(cancelled) return;
        const detail = err instanceof Error ? err.message : "网络异常";
        setError(detail);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [path, revision]);

  return { data, loading, error, reload };
}

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
  useInput((input) => {
    if(error && input.toLowerCase() === "r") {
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
        <Text color={colors.muted}>请检查网络后按 R 重试，或按 Esc 返回</Text>
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
