import { Feed } from "feed";
import { blogName, blogDescription } from "./global";
import { getAllArticles } from "./blog";

const feed = new Feed({
  title: blogName,
  description: blogDescription,
  id: "https://blog.nocp.space",
  link: "https://blog.nocp.space",
  language: "zh-cn",
  favicon: "https://nocp.space/icon.png",
  copyright: `Copyright (c) NriotHrreion ${new Date().getFullYear()}`,
  feedLinks: {
    atom: "https://nocp.space/rss/feed.xml",
    json: "https://nocp.space/rss/feed.json",
  },
  author: { name: "Norcleeh", link: "https://nocp.space" }
});

getAllArticles(true).forEach(article => {
  feed.addItem({
    title: article.title,
    id: `https://nocp.space/blog/${article.slug}`,
    link: `https://nocp.space/blog/${article.slug}`,
    description: article.excerpt,
    content: article.__content,
    author: [{ name: article.author }],
    date: article.date,
    image: article.photo,
  });
});

// export const atom = feed.atom1();
export const json = feed.json1();
