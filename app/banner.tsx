/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { githubAccount } from "@/lib/global";

import Avatar from "@/assets/images/avatar.jpg";

const textPoppingInterval = 300;
const textRemovalInterval = 50;
const blinkingInterval = 200;

// Messages that is dynamically shown on the homepage
const messages = [
  "I'm Norcleeh.",
  "I'm a student.",
  "I'm a coder.",
  "I like music.",
];

let textTimer: NodeJS.Timeout;
let blinkingTimer: NodeJS.Timeout;
let msgIndex = 0;

export function Banner() {
  const [displayed, setDisplayed] = useState("");
  const [paused, setPaused] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const performTextPopping = () => {
    setDisplayed("");
    clearInterval(textTimer);
    textTimer = setInterval(() => {
      setDisplayed((c) => {
        if(c.length === messages[msgIndex].length) {
          clearInterval(textTimer);
          setTimeout(() => performTextRemoval(), 3000);
          return c;
        }
        return c + messages[msgIndex][c.length];
      });
    }, textPoppingInterval);
  };

  const performTextRemoval = () => {
    msgIndex++;
    if(msgIndex >= messages.length) msgIndex = 0;

    clearInterval(textTimer);
    textTimer = setInterval(() => {
      setDisplayed((c) => {
        if(c.length === 0) {
          clearInterval(textTimer);
          setTimeout(() => performTextPopping(), 1000);
          return c;
        }
        return c.substring(0, c.length - 1);
      });
    }, textRemovalInterval);
  };

  const performBlinking = () => {
    clearInterval(blinkingTimer);
    blinkingTimer = setInterval(() => {
      if(!cursorRef.current) return;

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      cursorRef.current.classList.contains("text-transparent")
      ? cursorRef.current.classList.remove("text-transparent")
      : cursorRef.current.classList.add("text-transparent");
    }, blinkingInterval);
  };

  // Text Animation
  useEffect(() => {
    performTextPopping();
    performBlinking();

    return () => {
      clearInterval(textTimer);
      clearInterval(blinkingTimer);
    };
  }, []);

  useEffect(() => {
    if(paused) {
      clearInterval(textTimer);
      clearInterval(blinkingTimer);
    } else {
      performTextPopping();
      performBlinking();
    }

    return () => {
      clearInterval(textTimer);
      clearInterval(blinkingTimer);
    };
  }, [paused]);

  return (
    <section className="h-[100vh] mb-36 max-lg:mb-20 pt-40 flex flex-col justify-between max-lg:justify-normal">
      <div className="flex justify-between max-lg:flex-col max-lg:items-center">
        {/** large screen */}
        <h1 className="lg:text-[256px] md:text-9xl max-md:invisible font-extrabold text-muted-foreground select-none">Hello,</h1>
        {/** small screen */}
        <h1 className="invisible max-md:text-8xl max-md:visible font-extrabold text-muted-foreground select-none">Hello</h1>
        <div className="w-[45%] pr-28 flex flex-col gap-12 max-lg:items-center max-lg:text-center max-lg:pr-0 max-lg:translate-y-[-60px] max-md:w-[70%] max-sm:w-[90%]">
          <img
            className="w-40 h-40 rounded-full shadow-2xl"
            src={Avatar.src}
            alt="avatar"/>
          
          <div className="space-y-3 *:text-lg">
            <p>👋 我是一个热爱网页开发、音乐和Minecraft的高中生, 很高兴能见到你！</p>
            <p>你可以称呼我：<b>Norcleeh</b> <b>Nriot</b> <b>NriotHrreion</b> 或 <b>NoahHrreion</b></p>
            <p className="text-secondary-foreground">关注我 :)</p>
            <ul>
              <li>Github: <Link href={githubAccount}>Norcleeh</Link></li>
              <li>Bilibili: <Link href="https://space.bilibili.com/167995410">Norcleeh</Link></li>
              <li>𝕏: <Link href="https://x.com/Nriot_McPack">@Nriot_McPack</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex pl-28 max-lg:pl-0 relative group/displayed">
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer invisible absolute top-5 left-5 group-hover/displayed:visible"
          onClick={() => setPaused(!paused)}>
          {
            paused
            ? <Play />
            : <Pause />
          }
        </Button>
        <h1 className="lg:text-[200px] md:text-9xl max-md:text-6xl font-extrabold text-nowrap *:select-none">
          <span>{displayed}</span>
          <span ref={cursorRef}>_</span>
        </h1>
      </div>
    </section>
  );
}
