import type { Metadata } from "next";

import { blogName, blogDescription } from "@/lib/global";

import "katex/dist/katex.min.css";
import "./github-dark.css";
import "./github-light.css";
import "./blog.css";

import BlogBanner from "@/assets/images/blog-banner.jpg";

export const metadata: Metadata = {
  title: blogName,
  description: blogDescription
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col gap-10 overflow-y-auto" data-blog>
      <div className="w-full min-h-80 relative">
        <header
          className="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center gap-4 z-0 *:text-white">
          <h1 className="text-4xl font-semibold font-mono">{blogName}</h1>
          <p className="text-lg">{blogDescription}</p>
        </header>
        {/* Light mode adaptation */}
        <div className="w-full h-full absolute top-0 left-0 -z-10 dark:invisible bg-[rgba(255,255,255,.16)]"/>
        {/* Banner */}
        <div
          className="w-full h-full absolute top-0 left-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${BlogBanner.src})` }}/>
        {/* Blurry edge effect */}
        <div
          className="w-full h-full absolute top-0 left-0 -z-30 bg-cover bg-center blur-2xl"
          style={{ backgroundImage: `url(${BlogBanner.src})` }}/>
      </div>

      {children}
    </div>
  );
}
