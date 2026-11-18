export type FriendLink = {
  name: string;
  description: string;
  url: string;
  avatar: string;
};

export type FeaturedProject = {
  name: string;
  description: string;
  url: string;
  repo?: string;
};

export type ProjectItem = {
  name: string;
  year: number;
  description: string;
  url?: string;
  repo: string;
};

export type SheetItem = {
  name: string;
  author: string;
  tune: string;
  capo: number;
  src: string;
};

export type ArticleSummary = {
  slug: string;
  title: string;
  author: string;
  date: string;
  categories?: string[];
  tags: string[];
  excerpt?: string;
  hasAI?: boolean;
};

export type ArticleDetail = ArticleSummary & {
  content: string;
};

export type ProjectsResponse = {
  featured: readonly FeaturedProject[];
  projects: readonly ProjectItem[];
};

export type BlogListResponse = {
  recommended: readonly string[];
  posts: readonly ArticleSummary[];
};

export const featuredProjects: readonly FeaturedProject[] = [
  {
    name: "OPanel 管理面板",
    description: "易用、美观的新一代 Minecraft 服务器管理面板",
    url: "https://opanel.cn",
  },
  {
    name: "Calcium 计算器",
    description: "一个基于网页的多功能计算器，包含基础计算、变量存储、函数图像、汇率换算、单位换算、辈分称呼计算等功能。",
    url: "https://calcium.js.org",
    repo: "nocpiun/calcium",
  },
];
