import { readFile } from "node:fs/promises";
import { extname } from "node:path";

import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import vinext from "vinext";
import { defineConfig, type Plugin } from "vite";
import svgr from "vite-plugin-svgr";

function rawTextImports(): Plugin {
  return {
    name: "raw-text-imports",
    enforce: "pre",
    async load(id) {
      const filePath = id.replace(/\?.*$/, "");

      if (![".abc", ".txt"].includes(extname(filePath))) {
        return null;
      }

      const source = await readFile(filePath, "utf8");
      return `export default ${JSON.stringify(source)};`;
    },
  };
}

export default defineConfig(({ command }) => ({
  
  plugins: [
    rawTextImports(),
    svgr(),
    tailwindcss(),
    vinext(),
    // workaround for https://github.com/cloudflare/vinext/issues/853
    ...(command === "build" ? [nitro()] : []),
  ],
}));
