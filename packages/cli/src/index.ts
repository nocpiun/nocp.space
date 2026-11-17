#!/usr/bin/env node

import { createElement } from "react";
import { render, renderToString } from "ink";
import { App } from "./app.js";

const interactive = Boolean(process.stdin.isTTY && process.stdout.isTTY);

if(interactive) {
  await render(createElement(App, { interactive }), {
    alternateScreen: true,
    incrementalRendering: true,
    maxFps: 120,
  }).waitUntilExit();
} else {
  process.stdout.write(renderToString(createElement(App, { interactive })) + "\n");
}
