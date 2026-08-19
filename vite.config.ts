import { readFile } from "node:fs/promises";
import { extname } from "node:path";

import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import vinext from "vinext";
import { defineConfig, type Plugin } from "vite";
import svgr from "vite-plugin-svgr";

function rawTextImports(): Plugin {
  return {
    name: "raw-text-imports",
    enforce: "pre",
    async load(id) {
      const filePath = id.replace(/\?.*$/, "");

      if(![".abc", ".md"].includes(extname(filePath))) {
        return null;
      }

      const source = await readFile(filePath, "utf8");
      return `export default ${JSON.stringify(source)};`;
    },
  };
}

export default defineConfig({
  plugins: [
    rawTextImports(),
    svgr(),
    tailwindcss(),
    vinext(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
