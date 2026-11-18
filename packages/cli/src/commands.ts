import { travellingUrl } from "@nocp/shared";

export type Page = "home" | "help" | "links" | "donate" | "projects";

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
};

export const homeCommands: readonly Command[] = [
  { name: "/help", description: "查看使用帮助", page: "help" },
  { name: "/home", description: "回到主页", page: "home" },
  { name: "/back", description: "返回上一页", action: "back" },
  { name: "/links", description: "友情链接", page: "links" },
  { name: "/donate", description: "打赏", page: "donate" },
  { name: "/blog", description: "浏览博客" },
  { name: "/projects", description: "项目", page: "projects" },
  { name: "/sheets", description: "曲谱" },
  { name: "/travellings", description: "开往", url: travellingUrl },
];
