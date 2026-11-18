import linksJson from "../data/links.json" with { type: "json" };
import projectsJson from "../data/projects.json" with { type: "json" };
import recommendedJson from "../data/recommended.json" with { type: "json" };

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

export const friendLinks: readonly FriendLink[] = linksJson;

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

export const projects: readonly ProjectItem[] = projectsJson;

export const recommendedPosts: readonly string[] = recommendedJson;
