"use client";

import { useEffect } from "react";
import * as MarkdownJSX from "markdown-to-jsx";
import { RuleType } from "markdown-to-jsx";
import hljs from "highlight.js";
import hljsAbc from "highlightjs-abc";
import "katex";
import "katex/contrib/mhchem";
import katex from "katex";
import { CodeBlock } from "./code-block";
import { ArticleImage } from "./article-image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";
import bash from "@/lib/hljs/bash";
import { ErrorCallout, InfoCallout, TipCallout, WarningCallout } from "./ui/callout";

function renderLatex(content: string) {
  const codePatterns = [
    // Fences may contain shorter fences and remain open until the end of the document.
    /^(?: {0,3}> ?)* {0,3}((`|~)\2{2,})[^\r\n]*(?:\r?\n|$)[\s\S]*?(?:^(?: {0,3}> ?)* {0,3}\1\2*[ \t]*\r?$|(?![\s\S]))/gm,
    // Inline code may span soft line breaks, but not blank lines.
    /(?<![\\`])(?:\\\\)*(`+)(?!`)(?:[^\r\n]|\r?\n(?![ \t]*\r?\n))*?(?<!`)\1(?!`)/g,
    // Indented code starts at the beginning of the document or after a blank line.
    /(?:^|\r?\n[ \t]*\r?\n)(?:(?: {4}|\t)[^\r\n]*(?:\r?\n|$))+/g,
  ];

  let result = "";
  let position = 0;

  while(position < content.length) {
    let nextCode: RegExpExecArray | null = null;

    for(const pattern of codePatterns) {
      pattern.lastIndex = position;
      const match = pattern.exec(content);
      if(match && (!nextCode || match.index < nextCode.index)) {
        nextCode = match;
      }
    }

    if(!nextCode) break;

    result += renderFormulas(content.slice(position, nextCode.index)) + nextCode[0];
    position = nextCode.index + nextCode[0].length;
  }

  return result + renderFormulas(content.slice(position));
}

function renderFormulas(content: string) {
  // Keep escaped dollars and prices as text; only display math may span lines.
  const formulaPattern = /\\[\s\S]|\$\$((?:\\[\s\S]|[^\\$])+?)\$\$|(?<!\$)\$(?![$\s])((?:\\[^\r\n]|[^\\$\r\n])+?)(?<!\s)\$(?![$\d])/g;

  return content.replace(formulaPattern, (match, blockFormula: string | undefined, inlineFormula: string | undefined) => {
    const formula = blockFormula ?? inlineFormula;
    if(formula === undefined) return match;

    try {
      return katex.renderToString(formula, {
        displayMode: blockFormula !== undefined,
        output: "html",
        strict: "ignore"
      });
    } catch {
      return match;
    }
  });
}

export function Markdown({ wrapper, children, enableKatex = true }: {
  wrapper?: boolean
  children: string
  enableKatex?: boolean
}) {
  // Highlight.js & Katex Rendering
  useEffect(() => {
    hljs.unregisterLanguage("bash");
    hljs.unregisterLanguage("cmd");
    hljs.registerLanguage("bash", () => bash);
    hljs.registerLanguage("cmd", () => bash);
    hljs.registerLanguage("abc", hljsAbc);
    hljs.highlightAll();
  }, []);

  return (
    <MarkdownJSX.default options={{
      wrapper: wrapper ? "article" : undefined,
      overrides: {
        pre: CodeBlock,
        img: ArticleImage,
        table: Table,
        thead: TableHeader,
        tbody: TableBody,
        th: TableHead,
        tr: TableRow,
        td: TableCell,
        boxed: ({ children }) => (
          <span className="boxed">{children}</span>
        )
      },
      renderRule(next, node, renderChildren, state) {
        if(node.type === RuleType.blockQuote && node.alert) {
          switch(node.alert.toLowerCase()) {
            case "info": return <InfoCallout key={state.key}>{renderChildren(node.children, state)}</InfoCallout>;
            case "tip": return <TipCallout key={state.key}>{renderChildren(node.children, state)}</TipCallout>;
            case "warning": return <WarningCallout key={state.key}>{renderChildren(node.children, state)}</WarningCallout>;
            case "error": return <ErrorCallout key={state.key}>{renderChildren(node.children, state)}</ErrorCallout>;
          }
        }
        return next();
      }
    }}>
      {enableKatex ? renderLatex(children) : children}
    </MarkdownJSX.default>
  );
}
