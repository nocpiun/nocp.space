import type { Metadata } from "next";
import { getPostsByTag } from "@/lib/blog";
import { blogName, siteKeywords } from "@/lib/global";
import { ArticleCard } from "../../article-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params;

  return {
    title: `${blogName} - #${decodeURIComponent(tag)}`,
    keywords: [...siteKeywords, decodeURIComponent(tag)],
  };
}

export default async function Tag({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params;
  const posts = getPostsByTag(decodeURIComponent(tag));

  return (
    <div className="page-padding flex flex-col gap-10">
      <div className="mt-6 space-y-5">
        <h2 className="text-4xl font-bold">{"#"+ decodeURIComponent(tag)}</h2>
        <span className="text-secondary-foreground">共 {posts.length} 篇文章</span>
      </div>
      <div>
        {posts.map((post, i) => <ArticleCard {...post} key={i}/>)}
      </div>
    </div>
  );
}
