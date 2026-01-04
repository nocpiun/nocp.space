import type { Metadata } from "next";
import Link from "next/link";
import { blogName, siteKeywords } from "@/lib/global";
import { getNote } from "@/lib/notes";
import { formatDate } from "@/lib/utils";
import { Markdown } from "@/components/markdown";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);

  if(!note) return {};

  return {
    title: `${blogName} - ${note?.title}`,
    keywords: [...siteKeywords, ...note.tags],
  };
}

export default async function Note({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const note = getNote(slug);

  if(!note) {
    /** @todo */
    return <div></div>;
  }

  return (
    <div className="page-padding flex flex-col gap-10">
      <div className="mt-6 flex flex-col gap-12">
        <h1 className="text-4xl font-bold">{note.title}</h1>
        <div className="space-x-4">
          <span className="text-secondary-foreground">By {note.author}</span>
          <span className="text-yellow-600">{formatDate(note.date)}</span>
          <div className="inline-block space-x-1">
            {note.tags.map((tag, i) => (
              <Badge variant="secondary" key={i}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
      <Markdown wrapper>
        {note.__content}
      </Markdown>
    </div>
  );
}
