import type { Post } from "@/lib/blog";
import Link from "next/link";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export function ArticleCard(post: Post) {
  return (
    <div className="border-b border-muted last:border-none pt-3 pb-5 flex flex-col gap-3">
      <div className="flex justify-between items-center max-sm:block">
        <Button
          className="text-xl font-semibold p-0 max-sm:inline-block max-sm:whitespace-normal max-sm:break-words"
          variant="link"
          asChild>
          <Link href={"/blog/"+ post.slug}>
            {post.title}
          </Link>
        </Button>
        <span className="text-yellow-600 text-sm text-nowrap max-sm:float-right">{formatDate(post.date)}</span>
      </div>
      <div className="*:text-secondary-foreground *:text-[11pt] *:max-sm:whitespace-normal *:max-sm:break-words">
        <Markdown>{post.excerpt as string}</Markdown>
      </div>
    </div>
  );
}
