import { getAllNotes } from "@/lib/notes";
import { cliJson, toArticleSummary } from "../serialize";

export const dynamic = "force-static";

export function GET() {
  return cliJson(getAllNotes(false).map(toArticleSummary));
}
