"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import renderMathInElement from "katex/contrib/auto-render";

import Avatar from "@/assets/images/avatar.jpg";
import Link from "next/link";

const textPoppingInterval = 300;
const textRemovalInterval = 50;
const blinkingInterval = 200;

const messages = [
  "I'm Norcleeh.",
  "I'm a student.",
  "I'm a coder.",
  "I like music.",
  "World."
];

export default function Home() {
  const [displayed, setDisplayed] = useState("");
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Katex Rendering
  useEffect(() => {
    renderMathInElement(document.body);
  }, []);

  // Text Animation
  useEffect(() => {
    let textTimer: NodeJS.Timeout;
    let blinkingTimer: NodeJS.Timeout;
    let msgIndex = 0;

    const performTextPopping = () => {
      setDisplayed("");
      clearInterval(textTimer);
      textTimer = setInterval(() => {
        setDisplayed((current) => {
          if(current.length === messages[msgIndex].length) {
            clearInterval(textTimer);
            setTimeout(() => performTextRemoval(), 3000);
            return current;
          }
          return current + messages[msgIndex][current.length];
        });
      }, textPoppingInterval);
    };

    const performTextRemoval = () => {
      msgIndex++;
      if(msgIndex >= messages.length) msgIndex = 0;

      clearInterval(textTimer);
      textTimer = setInterval(() => {
        setDisplayed((current) => {
          if(current.length === 0) {
            clearInterval(textTimer);
            setTimeout(() => performTextPopping(), 1000);
            return current;
          }
          return current.substring(0, current.length - 1);
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

    performTextPopping();
    performBlinking();

    return () => {
      clearInterval(textTimer);
      clearInterval(blinkingTimer);
    };
  }, []);

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden">
      {/* Homepage */}
      <section className="h-[100vh] pt-40 flex flex-col">
        <div className="flex justify-between max-lg:flex-col max-lg:items-center">
          {/** large screen */}
          <h1 className="lg:text-[256px] md:text-9xl max-md:hidden font-extrabold text-muted-foreground select-none">Hello,</h1>
          {/** small screen */}
          <h1 className="hidden max-md:text-8xl max-md:block font-extrabold text-muted-foreground select-none">Hello</h1>
          <div className="w-[45%] pr-28 flex flex-col gap-12 max-lg:items-center max-lg:text-center max-lg:pr-0 max-lg:translate-y-[-60px] max-md:w-[70%] max-sm:w-[90%]">
            <Image
              className="w-40 h-40 rounded-full max-lg:shadow-2xl"
              src={Avatar.src}
              alt="avatar"
              width={30}
              height={30}/>
            
            <div className="space-y-3 *:text-lg">
              <p>👋 我是一个热爱网页开发、音乐和Minecraft的高中生, 很高兴能见到你！</p>
              <p>你可以称呼我：<b>Norcleeh</b> <b>Nriot</b> <b>NriotHrreion</b> 或 <b>NoahHrreion</b></p>
              <p className="text-muted-foreground">关注我 :)</p>
              <ul>
                <li>Github: <Link href="https://github.com/NriotHrreion">Norcleeh</Link></li>
                <li>Bilibili: <Link href="https://space.bilibili.com/167995410">Norcleeh</Link></li>
                <li>𝕏: <Link href="https://x.com/Nriot_McPack">@Nriot_McPack</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex pl-28 max-lg:pl-0">
          <h1 className="lg:text-[210px] md:text-9xl max-md:text-6xl font-extrabold text-nowrap *:select-none">
            <span>{displayed}</span>
            <span ref={cursorRef}>_</span>
          </h1>
        </div>
      </section>
    </div>
  );
}
