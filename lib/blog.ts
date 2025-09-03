import fs from "fs";
import path from "path";
import { loadFront } from "yaml-front-matter";

export interface Post {
  slug: string
  title: string
  author: string
  date: Date
  categories?: string[]
  tags: string[]
  photo?: string
  excerpt?: string
  hasAI?: boolean
}

export type Article = Post & { __content: string };

const postsDirectory = path.resolve(process.cwd(), "data/posts");
const posts: Post[] = getAllArticles(false);

export function getAllArticles<T extends boolean = false>(containContent: T): T extends true ? Article[] : Post[] {
  const list = [];
  const files = fs.readdirSync(postsDirectory);
  for(const fileName of files) {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const front = loadFront(fileContent) as Article;

    if(!containContent) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { __content, ...info } = front;
      (list as Post[]).push({ ...info, slug: fileName.replace(".md", "") });
    } else {
      list.push({ ...front, slug: fileName.replace(".md", "") });
    }
  }
  list.sort((a, b) => b.date.getTime() - a.date.getTime());
  return list;
}

export { posts };

export function getArticle(slug: string): Article | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if(!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const front = loadFront(fileContent);
  return { ...front, slug } as Article;
}

export function getPostByTitle(title: string): Post | null {
  for(const post of posts) {
    if(post.title === title) {
      return post;
    }
  }
  return null;
}

export function getPostsByCategory(category: string): Post[] {
  const result: Post[] = [];
  for(const post of posts) {
    if(post.categories && post.categories.includes(category) && !result.some(p => p.title === post.title)) {
      result.push(post);
    }
  }
  return result;
}

export function getPostsByTag(tag: string): Post[] {
  const result: Post[] = [];
  for(const post of posts) {
    if(post.tags.includes(tag) && !result.some(p => p.title === post.title)) {
      result.push(post);
    }
  }
  return result;
}

export function getTags(): { tag: string, amount: number }[] {
  const tags: { tag: string, amount: number }[] = [];
  for(const post of posts) {
    for(const tag of post.tags) {
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
