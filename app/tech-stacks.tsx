import SplitText from "@/components/animations/split-text";
import CountUp from "@/components/animations/count-up";

import TechStackLogos from "@/assets/images/techstacks.svg";

export function TechStacks() {
  return (
    <section className="border-t pt-14 flex justify-between items-center [&_svg_*]:fill-muted-foreground">
      <div className="flex flex-col gap-10">
        <TechStackLogos className="w-full h-fit aspect-square hidden max-sm:block"/>
        <div className="space-y-6">
          <h2 className="text-5xl max-xs:text-4xl font-semibold">技术栈</h2>
          <span className="text-lg">对技术的热爱驱动我探索的热情。</span>
        </div>
        <div className="flex gap-6 [&>*]:flex [&>*]:flex-col [&>*]:gap-4 [&>*]:pr-6 [&>*]:border-r [&>*]:last:border-0">
          <div>
            <SplitText
              text="A-"
              className="text-4xl font-semibold overflow-visible"
              delay={150}
              duration={1}
              ease="power3.out"
              splitType="words"
              textAlign="left"
              onLetterAnimationComplete={() => {}}/>
            <span className="text-secondary-foreground">Github 账号评级</span>
          </div>
          <div>
            <CountUp
              from={0}
              to={200}
              className="text-4xl !font-semibold"
              duration={1}
              onEnd={(elem) => elem.innerText += "+"}/>
            <span className="text-secondary-foreground">仓库获Star总数</span>
          </div>
        </div>
      </div>
      <TechStackLogos className="max-sm:hidden"/>
    </section>
  );
}
