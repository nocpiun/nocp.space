import { getArticle } from "@/lib/blog";
import { cliJson, toArticleSummary } from "../../serialize";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const article = getArticle(slug);

  if(!article) {
    return cliJson({ error: "Not Found" }, 404);
  }

  return cliJson({
    ...toArticleSummary(article.data),
    content: article.content.trim(),
  });
}
