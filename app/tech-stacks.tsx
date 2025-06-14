import Link from "next/link";
import { useState, useEffect } from "react";
import { IoLogoNodejs } from "react-icons/io5";
import {
  SiJavascript,
  SiTypescript,
  SiWebpack,
  SiBabel,
  SiNextdotjs,
  SiTailwindcss,
  SiSpigotmc,
  SiIntellijidea
} from "react-icons/si";
import {
  FaJava,
  FaLess,
  FaGitAlt,
  FaNpm,
  FaDocker
} from "react-icons/fa6";
import { DiReact } from "react-icons/di";
import { VscVscode } from "react-icons/vsc";

const techStacks = [
  { icon: <SiJavascript />, url: "https://javascript.com" },
  { icon: <SiTypescript />, url: "https://typescriptlang.org" },
  { icon: <IoLogoNodejs />, url: "https://nodejs.org" },
  { icon: <FaJava />, url: "https://java.com" },
  { icon: <SiWebpack />, url: "https://webpack.js.org" },
  { icon: <SiBabel />, url: "https://babeljs.io" },
  { icon: <DiReact />, url: "https://react.dev" },
  { icon: <SiNextdotjs />, url: "https://nextjs.org" },
  { icon: <FaLess />, url: "https://lesscss.org" },
  { icon: <SiTailwindcss />, url: "https://tailwindcss.com" },
  { icon: <SiSpigotmc />, url: "https://spigotmc.org" },
  { icon: <FaGitAlt />, url: "https://git-scm.com" },
  { icon: <FaNpm />, url: "https://npmjs.com" },
  { icon: <FaDocker />, url: "https://docker.com" },
  { icon: <VscVscode />, url: "https://code.visualstudio.com" },
  { icon: <SiIntellijidea />, url: "https://jetbrains.com/idea" },
];

export function TechStacks() {
  const [delta1, setDelta1] = useState(0);
  const [delta2, setDelta2] = useState(0);

  useEffect(() => {
    const d = .03;

    const nextFrame = () => {
      setDelta1((c) => {
        if(c - d <= -100) {
          return 100;
        }
        return c - d;
      });
      setDelta2((c) => {
        if(c - d <= -200) {
          return 0;
        }
        return c - d;
      });

      requestAnimationFrame(nextFrame);
    };

    const timer = requestAnimationFrame(nextFrame);

    return () => {
      cancelAnimationFrame(timer);
    };
  }, []);

  const icons = techStacks.map(({ icon, url }, i) => (
    <Link
      className="h-full [&>svg]:w-36 max-md:[&>svg]:w-20 [&>svg]:h-full [&>svg]:fill-muted-foreground"
      href={url}
      target="_blank"
      key={i}>
      {icon}
    </Link>
  ));

  return (
    <div className="w-full h-52 max-md:h-36 mt-10 p-10 flex max-md:gap-5 overflow-hidden">
      <div className="flex gap-14 max-md:gap-10 pr-14" style={{ transform: `translateX(${delta1}%)` }}>{icons}</div>
      <div className="flex gap-14 max-md:gap-10 pr-14" style={{ transform: `translateX(${delta2}%)` }}>{icons}</div>
    </div>
  );
}
