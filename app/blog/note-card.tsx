import type { Note } from "@/lib/notes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function NoteCard(note: Note) {
  return (
    <div className="border-b border-muted last:border-none pt-3 pb-5 flex flex-col gap-2">
      <div className="flex justify-between items-center max-sm:block">
        <Button
          className="text-xl font-semibold p-0 max-sm:inline-block max-sm:whitespace-normal max-sm:break-words"
          variant="link"
          asChild>
          <Link href={"/blog/notes/"+ note.slug}>
            {note.title}
          </Link>
        </Button>
        <span className="text-yellow-600 text-sm text-nowrap max-sm:float-right">{formatDate(note.date)}</span>
      </div>
      <div className="space-x-1">
        {note.tags.map((tag, i) => (
          <Badge variant="secondary" key={i}>{tag}</Badge>
        ))}
      </div>
    </div>
  );
}
