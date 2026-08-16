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
  const { data } = article;

  feed.addItem({
    title: data.title,
    id: `https://nocp.space/blog/${data.slug}`,
    link: `https://nocp.space/blog/${data.slug}`,
    description: data.excerpt,
    content: article.content,
    author: [{ name: data.author }],
    date: data.date,
    image: data.photo ? `https://nocp.space${data.photo}` : undefined,
  });
});

export const atom = feed.atom1();
export const json = feed.json1();
