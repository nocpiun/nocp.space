import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import bash from "shiki/langs/bash.mjs";
import bat from "shiki/langs/bat.mjs";
import css from "shiki/langs/css.mjs";
import diff from "shiki/langs/diff.mjs";
import html from "shiki/langs/html.mjs";
import javascript from "shiki/langs/javascript.mjs";
import json from "shiki/langs/json.mjs";
import jsx from "shiki/langs/jsx.mjs";
import markdown from "shiki/langs/markdown.mjs";
import ruby from "shiki/langs/ruby.mjs";
import tsx from "shiki/langs/tsx.mjs";
import typescript from "shiki/langs/typescript.mjs";
import yaml from "shiki/langs/yaml.mjs";
import { abcLanguage } from "../langs/abc.js";
import { dark2026Theme } from "../themes/2026-dark.js";
import { colors } from "../theme.js";
import { charWidth } from "./text-width.js";

export type HighlightToken = {
  text: string;
  color: string;
  italic?: boolean;
  bold?: boolean;
};

export type HighlightedLine = {
  tokens: HighlightToken[];
  backgroundColor?: string;
};

const themeName = "2026-dark";
const diffAddedBg = "#173322";
const diffRemovedBg = "#3a1b1f";

const highlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  themes: [dark2026Theme],
  langs: [
    javascript,
    typescript,
    jsx,
    tsx,
    ruby,
    bash,
    bat,
    diff,
    html,
    markdown,
    json,
    css,
    yaml,
    abcLanguage,
  ],
});

const loadedLangs = new Set(highlighter.getLoadedLanguages());
const highlightCache = new Map<string, HighlightedLine[]>();

function pushToken(
  tokens: HighlightToken[],
  text: string,
  color: string,
  italic = false,
  bold = false,
) {
  if(!text) return;
  const last = tokens[tokens.length - 1];
  if(last && last.color === color && Boolean(last.italic) === italic && Boolean(last.bold) === bold) {
    last.text += text;
    return;
  }
  const token: HighlightToken = { text, color };
  if(italic) token.italic = true;
  if(bold) token.bold = true;
  tokens.push(token);
}

export function highlightCodeBlock(code: string, rawLang: string): HighlightedLine[] {
  const lang = rawLang.trim().toLowerCase();
  const normalized = code.replace(/\r\n/g, "\n");
  const cacheKey = `${lang}\0${normalized}`;
  const cached = highlightCache.get(cacheKey);
  if(cached) return cached;

  const rawLines = normalized.split("\n");

  if(!lang || !loadedLangs.has(lang)) {
    const plain = rawLines.map((line) => ({
      tokens: line ? [{ text: line, color: colors.prose }] : [],
    }));
    highlightCache.set(cacheKey, plain);
    return plain;
  }

  const { tokens: tokenLines } = highlighter.codeToTokens(normalized, {
    lang,
    theme: themeName,
  });

  const result = rawLines.map((rawLine, index) => {
    const lineTokens = tokenLines[index] ?? [];
    const tokens: HighlightToken[] = [];

    for(const item of lineTokens) {
      const style = item.fontStyle ?? 0;
      pushToken(
        tokens,
        item.content,
        item.color ?? colors.prose,
        Boolean(style & 1),
        Boolean(style & 2),
      );
    }

    let backgroundColor: string | undefined;
    if(lang === "diff") {
      if(rawLine.startsWith("+") && !rawLine.startsWith("+++")) backgroundColor = diffAddedBg;
      else if(rawLine.startsWith("-") && !rawLine.startsWith("---")) backgroundColor = diffRemovedBg;
    }

    return { tokens, backgroundColor };
  });

  if(highlightCache.size >= 256) highlightCache.clear();
  highlightCache.set(cacheKey, result);
  return result;
}

export function wrapHighlightedLine(line: HighlightedLine, maxWidth: number): HighlightedLine[] {
  if(maxWidth <= 0 || line.tokens.length === 0) {
    return [{ tokens: [], backgroundColor: line.backgroundColor }];
  }

  const wrapped: HighlightedLine[] = [{ tokens: [], backgroundColor: line.backgroundColor }];
  let currentWidth = 0;

  for(const token of line.tokens) {
    for(const ch of token.text) {
      const w = charWidth(ch);
      if(currentWidth + w > maxWidth && wrapped[wrapped.length - 1].tokens.length > 0) {
        wrapped.push({ tokens: [], backgroundColor: line.backgroundColor });
        currentWidth = 0;
      }
      const current = wrapped[wrapped.length - 1];
      pushToken(current.tokens, ch, token.color, Boolean(token.italic), Boolean(token.bold));
      currentWidth += w;
    }
  }

  return wrapped;
}
