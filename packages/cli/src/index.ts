#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { createElement } from "react";
import { render, renderToString } from "ink";
import { App } from "./app.js";

function readVersion(): string {
  const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
    version: string;
  };
  return manifest.version;
}

const args = process.argv.slice(2);

if(args.includes("-v") || args.includes("--version")) {
  process.stdout.write(`${readVersion()}\n`);
} else if(args.includes("-h") || args.includes("--help")) {
  process.stdout.write([
    `nocp.space v${readVersion()} — The command-line companion to nocp.space`,
    "",
    "Usage:",
    "  npx nocp.space [options]",
    "",
    "Options:",
    "  -h, --help     显示帮助信息",
    "  -v, --version  显示版本号",
    "",
    "在交互式终端中运行即可进入 TUI，输入 /help 查看内置命令。",
    "",
  ].join("\n"));
} else if(args.length > 0) {
  process.stderr.write(`未知参数: ${args.join(" ")}\n使用 --help 查看可用选项。\n`);
  process.exitCode = 1;
} else {
  const interactive = Boolean(process.stdin.isTTY && process.stdout.isTTY);

  if(interactive) {
    await render(createElement(App, { interactive }), {
      interactive: true,
      alternateScreen: true,
      incrementalRendering: true,
      maxFps: 120,
    }).waitUntilExit();
  } else {
    process.stdout.write(renderToString(createElement(App, { interactive })) + "\n");
  }
}
