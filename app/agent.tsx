import { googleSansCode, robotoSlab } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function Agent() {
  return (
    <section className="flex justify-between max-md:flex-col">
      <div className="flex flex-col gap-2">
        <div className="mb-6">
          <div className="inline-block px-1.5 py-1 font-semibold! bg-foreground text-background -translate-x-4 translate-y-3 -rotate-12">
            敬请期待
          </div>
          <h2 className={cn("text-5xl *:font-semibold! space-x-2", robotoSlab.className)}>
            <span className={cn("text-[#bb4d00] dark:text-[#cb6018]", googleSansCode.className)}>???</span>
            <span>Agent</span>
          </h2>
        </div>
        <span className="text-lg">一个基于Tauri+Next.js的桌面端个人助手</span>
        <span className="text-lg">配置简易，界面美观，使用安全....</span>
      </div>
      <div className="flex flex-col justify-end items-end gap-2">
        <span className="text-xl">🪨</span>
        <span className="text-sm text-secondary-foreground">
          * 目前本人的开发重心，尚未完工
        </span>
      </div>
    </section>
  );
}
