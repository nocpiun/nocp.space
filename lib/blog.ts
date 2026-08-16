import matter from "gray-matter";

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

export type Article = Omit<ReturnType<typeof matter>, "data"> & {
  data: Post;
};

const postSources = import.meta.glob("../data/posts/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

function parseArticle(slug: string, fileContent: string): Article {
  const article = matter(fileContent) as Article;
  article.data = { ...article.data, slug };
  return article;
}

export function getAllArticles<T extends boolean = false>(containContent: T): T extends true ? Article[] : Post[] {
  const articles = Object.entries(postSources).map(([filePath, fileContent]) => (
    parseArticle(filePath.replace(/^.*\//, "").replace(/\.md$/, ""), fileContent)
  ));

  articles.sort(({ data: a }, { data: b }) => (
    a.date.getTime() !== b.date.getTime()
      ? b.date.getTime() - a.date.getTime()
      : b.title.localeCompare(a.title)
  ));

  return (containContent ? articles : articles.map(article => article.data)) as T extends true ? Article[] : Post[];
}

export function getArticle(slug: string): Article | null {
  const fileContent = postSources[`../data/posts/${slug}.md`];
  return fileContent === undefined ? null : parseArticle(slug, fileContent);
}

export function getPostByTitle(title: string): Post | null {
  for(const post of getAllArticles(false)) {
    if(post.title === title) {
      return post;
    }
  }
  return null;
}

export function getPostsByCategory(category: string): Post[] {
  const result: Post[] = [];
  for(const post of getAllArticles(false)) {
    if(post.categories && post.categories.includes(category) && !result.some(p => p.title === post.title)) {
      result.push(post);
    }
  }
  return result;
}

export function getPostsByTag(tag: string): Post[] {
  const result: Post[] = [];
  for(const post of getAllArticles(false)) {
    if(post.tags.includes(tag) && !result.some(p => p.title === post.title)) {
      result.push(post);
    }
  }
  return result;
}

export function getTags(): { tag: string, amount: number }[] {
  const tags: { tag: string, amount: number }[] = [];
  for(const post of getAllArticles(false)) {
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
