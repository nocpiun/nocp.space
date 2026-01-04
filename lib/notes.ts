import fs from "fs";
import path from "path";
import { loadFront } from "yaml-front-matter";

export interface Note {
  slug: string
  title: string
  author: string
  date: Date
  tags: string[]
}

export type NoteWithContent = Note & { __content: string };

const notesDirectory = path.resolve(process.cwd(), "data/notes");
const notes: Note[] = getAllNotes(false);

export function getAllNotes<T extends boolean = false>(containContent: T): T extends true ? NoteWithContent[] : Note[] {
  const list = [];
  const files = fs.readdirSync(notesDirectory);
  for(const fileName of files) {
    const filePath = path.join(notesDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const front = loadFront(fileContent) as NoteWithContent;

    if(!containContent) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { __content, ...info } = front;
      (list as Note[]).push({ ...info, slug: fileName.replace(".md", "") });
    } else {
      list.push({ ...front, slug: fileName.replace(".md", "") });
    }
  }
  list.sort((a, b) => b.date.getTime() - a.date.getTime());
  return list;
}

export { notes };

export function getNote(slug: string): NoteWithContent | null {
  const filePath = path.join(notesDirectory, `${slug}.md`);
  if(!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const front = loadFront(fileContent);
  return { ...front, slug } as NoteWithContent;
}

export function getNoteByTitle(title: string): Note | null {
  for(const note of notes) {
    if(note.title === title) {
      return note;
    }
  }
  return null;
}

export function getNotesByTag(tag: string): Note[] {
  const result: Note[] = [];
  for(const note of notes) {
    if(note.tags.includes(tag) && !result.some(n => n.title === note.title)) {
      result.push(note);
    }
  }
  return result;
}

export function getNoteTags(): { tag: string, amount: number }[] {
  const tags: { tag: string, amount: number }[] = [];
  for(const note of notes) {
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
