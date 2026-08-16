import type { Metadata } from "next";
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
    title: `${blogName} - ${note.data.title}`,
    keywords: [...siteKeywords, ...note.data.tags],
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

  const { data } = note;

  return (
    <div className="page-padding flex flex-col gap-10">
      <div className="mt-6 flex flex-col gap-12">
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <div className="space-x-4 *:whitespace-nowrap *:inline-block">
          <span className="text-secondary-foreground">By {data.author}</span>
          <span className="text-yellow-600">{formatDate(data.date)}</span>
          <div className="inline-block space-x-1">
            {data.tags.map((tag, i) => (
              <Badge variant="secondary" key={i}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="md:px-4">
        <Markdown wrapper>
          {note.content}
        </Markdown>
      </div>
    </div>
  );
}
