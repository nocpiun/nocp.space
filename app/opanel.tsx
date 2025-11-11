import Link from "next/link";
import { ExternalLink } from "lucide-react";

import OPanelLogo from "@/assets/images/opanel-logo.png";

export function OPanel() {
  return (
    <section className="rounded-xl border h-52 max-sm:h-fit bg-muted shadow-sm overflow-hidden max-lg:overflow-visible max-lg:mt-10 relative z-10">
      <img
        className="absolute -left-10 -bottom-1/2 max-lg:-top-28 max-lg:-left-16 w-96 aspect-square max-lg:w-64"
        style={{ imageRendering: "pixelated" }}
        src={OPanelLogo.src}
        alt="opanel-logo"/>
      <div className="h-full float-right px-11 py-7 max-sm:pt-28 max-sm:px-6 flex flex-col justify-between items-end gap-2 [&>span]:text-right">
        <Link href="https://opanel.cn" target="_blank">
          <h2 className="text-foreground text-3xl max-sm:text-2xl max-xs:text-xl font-semibold whitespace-nowrap">
            <ExternalLink className="mr-3 inline-block" size={16} stroke="var(--color-secondary-foreground)"/>
            OPanel 管理面板
          </h2>
        </Link>
        <span className="text-lg max-xs:text-sm">
          <span className="max-sm:hidden">服务器管理？一个插件就够了。<br /></span>
          <span>易用、美观的新一代Minecraft服务器管理面板</span>
        </span>
        <span className="text-sm text-secondary-foreground">
          * 目前本人最成功的社区开源项目
        </span>
      </div>
    </section>
  );
}
