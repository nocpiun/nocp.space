import { getNote } from "@/lib/notes";
import { cliJson, toArticleSummary } from "../../serialize";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const note = getNote(slug);

  if(!note) {
    return cliJson({ error: "Not Found" }, 404);
  }

  return cliJson({
    ...toArticleSummary(note.data),
    content: note.content.trim(),
  });
}
