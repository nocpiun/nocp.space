import fs from "fs";
import path from "path";
import { loadFront } from "yaml-front-matter";

export interface Post {
  slug: string
  title: string
  author: string
  date: Date
  categories: string[]
  tags: string[]
  photo: string
  excerpt: string
}

export type Article = Post & { __content: string };

const postsDirectory = path.resolve(process.cwd(), "data/posts");
const posts: Post[] = [];

initialize();

function initialize() {
  const files = fs.readdirSync(postsDirectory);
  for(const fileName of files) {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const front = loadFront(fileContent) as Article;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __content, ...info } = front;
    posts.push({ ...info, slug: fileName.replace(".md", "") });
  }
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export { posts };

export function getPostsByCategory(category: string): Post[] {
  const result: Post[] = [];
  for(const post of posts) {
    if(post.categories.includes(category) && !result.some(p => p.title === post.title)) {
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

export function getArticle(slug: string): Article | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if(!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const front = loadFront(fileContent);
  return { ...front, slug } as Article;
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
