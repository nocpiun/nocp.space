import { blogPath, githubAccount, siteUrl } from "@nocp/shared";

export const profileUrls = {
  blog: `${siteUrl}${blogPath}`,
  github: githubAccount,
  bilibili: "https://space.bilibili.com/167995410",
  x: "https://x.com/norcleeh",
  email: "mailto:nriot233@gmail.com",
} as const;

export const profileLinks = [
  { label: "Blog", url: profileUrls.blog },
  { label: "GitHub", url: profileUrls.github },
  { label: "Bilibili", url: profileUrls.bilibili },
  { label: "X", url: profileUrls.x },
  { label: "Email", url: profileUrls.email },
] as const;
