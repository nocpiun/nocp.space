import { NextResponse } from "next/server";
import template from "./llms.template.txt";
import { getAllArticles, Post } from "@/lib/blog";
import { getAllNotes, Note } from "@/lib/notes";
import { githubAccount, siteDescription, siteName } from "@/lib/global";

export const dynamic = "force-static";

function sanitizeStr(str: string) {
  return str
    .replaceAll(/<.*>/g, " ");
}

function sanitizeTitle(str: string) {
  return sanitizeStr(str)
    .replaceAll("[", "\\[")
    .replaceAll("]", "\\]");
}

function formatPostList(posts: Post[]) {
  return posts
    .map((item) => `- [${sanitizeTitle(item.title)}](/blog/${item.slug})${item.excerpt ? (": "+ sanitizeStr(item.excerpt)) : ""}`)
    .join("\n");
}

function formatNoteList(posts: Note[]) {
  return posts
    .map((item) => `- [${sanitizeTitle(item.title)}](/blog/notes/${item.slug})`)
    .join("\n");
}

export function GET() {
  const posts = getAllArticles(false);
  const notes = getAllNotes(false);

  const content = template
    .replace("{0}", siteName)
    .replace("{1}", siteDescription)
    .replace("{2}", githubAccount)
    .replace("{POSTS}", formatPostList(posts))
    .replace("{NOTES}", formatNoteList(notes));

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
