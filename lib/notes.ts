import matter from "gray-matter";

export interface Note {
  slug: string
  title: string
  author: string
  date: Date
  tags: string[]
}

export type NoteWithContent = Omit<ReturnType<typeof matter>, "data"> & {
  data: Note;
};

const noteSources = import.meta.glob("../data/notes/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

function parseNote(slug: string, fileContent: string): NoteWithContent {
  const note = matter(fileContent) as NoteWithContent;
  note.data = { ...note.data, slug };
  return note;
}

export function getAllNotes<T extends boolean = false>(containContent: T): T extends true ? NoteWithContent[] : Note[] {
  const notes = Object.entries(noteSources).map(([filePath, fileContent]) => (
    parseNote(filePath.replace(/^.*\//, "").replace(/\.md$/, ""), fileContent)
  ));

  notes.sort(({ data: a }, { data: b }) => (
    a.date.getTime() !== b.date.getTime()
      ? b.date.getTime() - a.date.getTime()
      : b.title.localeCompare(a.title)
  ));

  return (containContent ? notes : notes.map(note => note.data)) as T extends true ? NoteWithContent[] : Note[];
}

export function getNote(slug: string): NoteWithContent | null {
  const fileContent = noteSources[`../data/notes/${slug}.md`];
  return fileContent === undefined ? null : parseNote(slug, fileContent);
}

export function getNoteByTitle(title: string): Note | null {
  for(const note of getAllNotes(false)) {
    if(note.title === title) {
      return note;
    }
  }
  return null;
}

export function getNotesByTag(tag: string): Note[] {
  const result: Note[] = [];
  for(const note of getAllNotes(false)) {
    if(note.tags.includes(tag) && !result.some(n => n.title === note.title)) {
      result.push(note);
    }
  }
  return result;
}

export function getNoteTags(): { tag: string, amount: number }[] {
  const tags: { tag: string, amount: number }[] = [];
  for(const note of getAllNotes(false)) {
    for(const tag of note.tags) {
      if(!tags.some(t => t.tag === tag)) {
        tags.push({ tag, amount: 1 });
      } else {
        const existingTag = tags.find(t => t.tag === tag);
        if(existingTag) {
          existingTag.amount++;
        }
      }
    }
  }
  return tags;
}
