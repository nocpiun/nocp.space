"use client";

import { useEffect } from "react";
import * as MarkdownJSX from "markdown-to-jsx";
import hljs from "highlight.js";
import "katex/dist/katex";
import "katex/contrib/mhchem";
import renderMathInElement from "katex/contrib/auto-render";
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

export function Markdown({ wrapper, children }: {
  wrapper?: boolean
  children: string
}) {
  // Highlight.js & Katex Rendering
  useEffect(() => {
    hljs.unregisterLanguage("bash");
    hljs.unregisterLanguage("cmd");
    hljs.registerLanguage("bash", () => bash);
    hljs.registerLanguage("cmd", () => bash);
    hljs.highlightAll();
    
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false},
      ]
    });
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
      }
    }}>
      {children}
    </MarkdownJSX.default>
  );
}
