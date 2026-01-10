"use client";

import Link from "next/link";
import { Book, ExternalLink, Github, Mail, Tv } from "lucide-react";
import SplitText from "@/components/animations/split-text";
import { Button } from "@/components/ui/button";
import { githubAccount } from "@/lib/global";

import Avatar from "@/assets/images/avatar.jpg";

export function Banner() {
  return (
    <section className="pt-40 flex justify-between items-center max-md:justify-center">
      <div className="flex flex-col items-start max-md:items-center max-md:gap-2">
        <SplitText
          text="Code the future."
          className="text-5xl font-normal italic overflow-visible"
          delay={150}
          duration={2}
          ease="power3.out"
          splitType="words"
          onLetterAnimationComplete={() => {}}/>
        <img
          className="w-40 h-40 mt-10 rounded-full shadow-xl hidden max-md:block"
          src={Avatar.src}
          alt="avatar"/>
        <span className="mt-10 text-lg *:leading-9 max-md:text-center">
          我是一个热爱前端开发、音乐和Minecraft的学生，<br />
          很高兴能见到你！👋
        </span>
        <div className="mt-6 flex flex-wrap max-md:justify-center gap-0 [&>a]:text-foreground [&>a]:no-underline [&>a]:rounded-full">
          <Button
            className="!text-white bg-theme hover:bg-theme-foreground mr-2"
            size="lg"
            asChild>
            <Link href="/blog">
              <Book stroke="#fff"/>
              Blog
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon-lg"
            asChild>
            <Link href={githubAccount} target="_blank">
              <Github />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon-lg"
            asChild>
            <Link href="https://space.bilibili.com/167995410" target="_blank">
              <Tv />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon-lg"
            asChild>
            <Link href="https://x.com/norcleeh" target="_blank">
              𝕏
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon-lg"
            asChild>
            <Link href="mailto:nriot233@gmail.com" target="_blank">
              <Mail />
            </Link>
          </Button>
        </div>
      </div>
      <img
        className="w-40 h-40 rounded-full shadow-xl max-md:hidden"
        src={Avatar.src}
        alt="avatar"/>
    </section>
  );
}
