import Link from "next/link";
import { BookMarked, Rss, Tag } from "lucide-react";
import { getPostByTitle, getTags, posts } from "@/lib/blog";
import { ArticleCard } from "./article-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { getRelativeNumber } from "@/lib/utils";

import recommended from "@/data/info/recommended.json";

export default function BlogOverview() {
  return (
    <div className="page-padding flex gap-5">
      <div className="flex-2/3 max-sm:flex-1 max-sm:min-w-0">
        {posts.map((post, i) => <ArticleCard {...post} key={i}/>)}
      </div>

      <div className="flex-1/3 flex flex-col gap-7 max-md:hidden">
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <BookMarked size={20}/>
              推荐阅读
            </CardTitle>
            <CardDescription>
              精华文章，不定期更新
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-10 flex flex-col gap-2">
            <ul className="space-y-2">
              {recommended.map((title, i) => (
                <li className="list-disc marker:text-muted-foreground" key={i}>
                  <Link
                    href={`/blog/${getPostByTitle(title)?.slug}`}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <Tag size={20}/>
              标签
            </CardTitle>
          </CardHeader>
          <CardContent className="space-x-1 text-center">
            {getTags().map(({ tag, amount }, i) => (
              <Link
                href={`/blog/tag/${tag}`}
                className="text-nowrap text-secondary-foreground"
                style={{ fontSize: `${getRelativeNumber(9, 26, amount, posts.length)}pt` }}
                key={i}>
                {"#"+ tag}
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <Rss size={20}/>
              订阅 RSS Feed
            </CardTitle>
            <CardDescription>
              欢迎订阅NBlog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ButtonGroup className="w-full [&>*]:flex-1 *:text-foreground *:hover:no-underline">
              <Button variant="outline" disabled>
                atom
              </Button>
              <Button variant="outline" asChild>
                <Link href="/rss/feed.json">json</Link>
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
