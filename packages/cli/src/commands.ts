import { travellingUrl } from "@nocp/shared";

export type Page = "home" | "help" | "links" | "donate" | "projects" | "sheets" | "blog" | "notes";

export type Command = {
  name: string;
  description: string;
  page?: Page;
  action?: "back";
  url?: string;
};

export const pagePaths: Record<Page, string> = {
  home: "~/",
  help: "~/help",
  links: "~/links",
  donate: "~/donate",
  projects: "~/projects",
  sheets: "~/sheets",
  blog: "~/blog",
  notes: "~/notes",
};

export const homeCommands: readonly Command[] = [
  { name: "/help", description: "查看使用帮助", page: "help" },
  { name: "/home", description: "回到主页", page: "home" },
  { name: "/back", description: "返回上一页", action: "back" },
  { name: "/links", description: "友情链接", page: "links" },
  { name: "/donate", description: "打赏", page: "donate" },
  { name: "/blog", description: "浏览博客", page: "blog" },
  { name: "/notes", description: "浏览笔记", page: "notes" },
  { name: "/projects", description: "项目", page: "projects" },
  { name: "/sheets", description: "曲谱", page: "sheets" },
  { name: "/travellings", description: "开往", url: travellingUrl },
];
