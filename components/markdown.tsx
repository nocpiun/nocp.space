/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from "react";
import * as MarkdownJSX from "markdown-to-jsx";
import { RuleType } from "markdown-to-jsx";
import hljs from "highlight.js";
import hljsAbc from "highlightjs-abc";
import "katex/dist/katex";
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
  // block latex
  content = content.replace(/\$\$([^\$]+)\$\$/g, (match, formula) => {
    try {
      return katex.renderToString(formula, { displayMode: true, output: "html", strict: "ignore" });
    } catch (e) {
      return match;
    }
  });

  // inline latex
  content = content.replace(/\$([^\$]+)\$/g, (match, formula) => {
    try {
      return katex.renderToString(formula, { displayMode: false, output: "html", strict: "ignore" });
    } catch (e) {
      return match;
    }
  });

  return content;
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
        td: TableCell
      },
      renderRule(next, node, renderChildren, state) {
        if(node.type === RuleType.blockQuote && node.alert) {
          switch(node.alert.toLowerCase()) {
            case "info": return <InfoCallout key={state.key}>{renderChildren(node.children[0], state)}</InfoCallout>;
            case "tip": return <TipCallout key={state.key}>{renderChildren(node.children[0], state)}</TipCallout>;
            case "warning": return <WarningCallout key={state.key}>{renderChildren(node.children[0], state)}</WarningCallout>;
            case "error": return <ErrorCallout key={state.key}>{renderChildren(node.children[0], state)}</ErrorCallout>;
          }
        }
        return next();
      }
    }}>
      {enableKatex ? renderLatex(children) : children}
    </MarkdownJSX.default>
  );
}
