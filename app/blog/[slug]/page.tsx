import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "lucide-react";
import { blogName, siteKeywords } from "@/lib/global";
import { getArticle } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Markdown } from "@/components/markdown";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if(!article) return {};

  return {
    title: `${blogName} - ${article?.title}`,
    description: article?.excerpt,
    keywords: [...siteKeywords, ...article.tags],
  };
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if(!article) {
    /** @todo */
    return <div></div>;
  }

  return (
    <div className="page-padding flex flex-col gap-10">
      <div className="mt-6 flex flex-col gap-12">
        <h1 className="text-4xl font-bold">{article.title}</h1>
        <div className="space-x-4">
          <span className="text-secondary-foreground">By {article.author}</span>
          <span className="text-yellow-600">{formatDate(article.date)}</span>
          <div className="inline-block space-x-2">
            {article.tags.map((tag, i) => (
              <Link
                href={`/blog/tag/${tag}`}
                key={i}>
                {"#"+ tag}
              </Link>
            ))}
          </div>
        </div>
        {article.hasAI && (
          <Alert className="rounded-md">
            <Info />
            <AlertTitle>本文包含AI生成内容</AlertTitle>
            <AlertDescription>
              本文内容中有部分内容由AI生成，请仔细甄别
            </AlertDescription>
          </Alert>
        )}
      </div>
      <Markdown wrapper>
        {article.__content}
      </Markdown>
    </div>
  );
}
