import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { defineConfig } from "rolldown";

const manifest = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const runtimeDependencies = Object.keys(manifest.dependencies);

function loadMarkdownCollection(dirUrl) {
  const dirPath = fileURLToPath(dirUrl);
  const files = readdirSync(dirPath).filter((name) => name.endsWith(".md"));

  const items = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const raw = readFileSync(join(dirPath, fileName), "utf8");
    const parsed = matter(raw);
    const data = parsed.data;
    const rawDate = data.date instanceof Date ? data.date : new Date(String(data.date ?? 0));
    const timestamp = Number.isNaN(rawDate.getTime()) ? 0 : rawDate.getTime();
    const date = timestamp ? rawDate.toISOString().slice(0, 10) : "";

    return {
      slug,
      title: String(data.title ?? slug),
      author: String(data.author ?? ""),
      date,
      timestamp,
      categories: Array.isArray(data.categories) ? data.categories.map(String) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      excerpt: typeof data.excerpt === "string" ? data.excerpt : undefined,
      hasAI: Boolean(data.hasAI),
      content: parsed.content.trim(),
    };
  });

  items.sort((a, b) => (
    a.timestamp !== b.timestamp
      ? b.timestamp - a.timestamp
      : b.title.localeCompare(a.title)
  ));

  return items.map(({ timestamp: _timestamp, ...rest }) => rest);
}

function nocpContentPlugin() {
  const virtualId = "virtual:nocp-content";
  const resolvedId = `\0${virtualId}`;

  return {
    name: "nocp-content",
    resolveId(id) {
      return id === virtualId ? resolvedId : null;
    },
    load(id) {
      if(id !== resolvedId) return null;
      const posts = loadMarkdownCollection(new URL("../shared/data/posts/", import.meta.url));
      const notes = loadMarkdownCollection(new URL("../shared/data/notes/", import.meta.url));
      return `export const posts = ${JSON.stringify(posts)};\nexport const notes = ${JSON.stringify(notes)};\n`;
    },
  };
}

export default defineConfig({
  cwd: fileURLToPath(new URL("./", import.meta.url)),
  input: "src/index.ts",
  platform: "node",
  plugins: [nocpContentPlugin()],
  // Bundle workspace source; keep runtime libraries installed through npm.
  external: (id) => runtimeDependencies.some((name) => id === name || id.startsWith(`${name}/`)),
  output: {
    file: "dist/index.js",
    format: "esm",
  },
});
