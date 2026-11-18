import { NextResponse } from "next/server";
import type { ArticleSummary } from "@nocp/shared";
import type { Post } from "@/lib/blog";
import type { Note } from "@/lib/notes";

export function formatArticleDate(date: Date): string {
  const time = date instanceof Date ? date.getTime() : new Date(date).getTime();
  return Number.isNaN(time) ? "" : new Date(time).toISOString().slice(0, 10);
}

export function toArticleSummary(item: Post | Note): ArticleSummary {
  const post = item as Partial<Post>;
  return {
    slug: item.slug,
    title: item.title,
    author: item.author,
    date: formatArticleDate(item.date),
    categories: post.categories,
    tags: item.tags,
    excerpt: post.excerpt,
    hasAI: post.hasAI,
  };
}

export function cliJson(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "public, max-age=300",
    },
  });
}
