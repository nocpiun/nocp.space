import Link from "next/link";
import { useTheme } from "next-themes";
import { ExternalLink } from "lucide-react";

import CalciumScreenshot1Light from "@/assets/images/calcium-1-light.png";
import CalciumScreenshot2Light from "@/assets/images/calcium-2-light.png";
import CalciumScreenshot1Dark from "@/assets/images/calcium-1-dark.png";
import CalciumScreenshot2Dark from "@/assets/images/calcium-2-dark.png";

export default function Calcium() {
  const { theme } = useTheme();

  return (
    <section className="min-2xl:mb-14 pt-16 max-md:pt-0 h-[500px] flex justify-between max-md:flex-col-reverse max-md:gap-10">
      <div className="flex-1 flex flex-col max-md:justify-center gap-10">
        <Link href="https://calcium.js.org" target="_blank">
          <h2 className="text-foreground text-3xl font-semibold">
            Calcium 计算器
            <ExternalLink className="ml-3 inline-block" size={16} stroke="var(--color-secondary-foreground)"/>
          </h2>
        </Link>
        <div className="space-y-4">
          <p className="text-lg">
            一个基于网页的多功能计算器<br />
            包含基础计算、变量存储、函数图像、汇率换算、单位换算、辈分称呼计算等功能。
          </p>
          <p className="text-sm text-secondary-foreground">
            * 本人在高中阶段制作的较为成功的个人项目
          </p>
        </div>
      </div>
      <div className="flex-2 max-md:flex-none max-md:h-fit [&>img]:rotate-x-6 [&>img]:rotate-y-12 [&>img]:rotate-z-6 relative max-md:[&>img]:transform-none">
        <img
          className="absolute max-md:static top-24 translate-x-9 max-md:translate-none shadow-xl"
          src={theme === "dark" ? CalciumScreenshot1Dark.src : CalciumScreenshot1Light.src}
          alt="calcium-screenshot"/>
        <img
          className="absolute max-md:static translate-x-36 shadow-lg -z-10 max-md:hidden"
          src={theme === "dark" ? CalciumScreenshot2Dark.src : CalciumScreenshot2Light.src}
          alt="calcium-screenshot"/>
      </div>
    </section>
  );
}
