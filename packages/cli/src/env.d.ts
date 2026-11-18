declare module "virtual:nocp-content" {
  export type ArticleEntry = {
    slug: string;
    title: string;
    author: string;
    date: string;
    categories?: string[];
    tags: string[];
    excerpt?: string;
    hasAI?: boolean;
    content: string;
  };

  export const posts: readonly ArticleEntry[];
  export const notes: readonly ArticleEntry[];
}
