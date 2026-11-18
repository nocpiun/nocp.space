import links from "@/data/info/links.json";
import { cliJson } from "../serialize";

export const dynamic = "force-static";

export function GET() {
  return cliJson(links);
}
