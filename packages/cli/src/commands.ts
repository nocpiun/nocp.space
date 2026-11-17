export type Command = {
  name: string;
  description: string;
};

export const homeCommands: readonly Command[] = [
  { name: "/help", description: "查看使用帮助" },
  { name: "/home", description: "回到主页" },
  { name: "/back", description: "返回上一页" },
  { name: "/links", description: "友情链接" },
  { name: "/donate", description: "打赏" },
  { name: "/blog", description: "浏览博客" },
  { name: "/projects", description: "项目" },
  { name: "/sheets", description: "曲谱" },
  { name: "/travellings", description: "开往" },
];
