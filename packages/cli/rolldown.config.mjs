import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "rolldown";

const manifest = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const runtimeDependencies = Object.keys(manifest.dependencies);

export default defineConfig({
  cwd: fileURLToPath(new URL("./", import.meta.url)),
  input: "src/index.ts",
  platform: "node",
  // Bundle workspace source; keep runtime libraries installed through npm.
  external: id => runtimeDependencies.some(name => id === name || id.startsWith(`${name}/`)),
  output: {
    file: "dist/index.js",
    format: "esm",
  },
});
