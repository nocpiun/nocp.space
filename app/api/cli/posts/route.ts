import recommended from "@/data/info/recommended.json";
import { getAllArticles } from "@/lib/blog";
import { cliJson, toArticleSummary } from "../serialize";

export const dynamic = "force-static";

export function GET() {
  return cliJson({
    recommended,
    posts: getAllArticles(false).map(toArticleSummary),
  });
}
