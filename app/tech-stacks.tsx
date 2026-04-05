import SplitText from "@/components/animations/split-text";
import CountUp from "@/components/animations/count-up";

import TechStackLogos from "@/assets/images/techstacks.svg";

export function TechStacks() {
  return (
    <section className="relative py-14 flex justify-center items-center [&_svg_*]:fill-muted">
      <TechStackLogos className="absolute top-1/2 left-1/2 -translate-1/2 -z-10"/>
      <div className="flex flex-col items-center gap-10">
        <div className="space-y-6">
          <h2 className="text-5xl text-center max-xs:text-4xl font-semibold">技术栈</h2>
          <span className="text-lg">对技术的热爱驱动我探索的热情。</span>
        </div>
        <div className="flex justify-center [&>*]:flex [&>*]:flex-col [&>*]:gap-4">
          <div className="pr-6 border-r text-right">
            <CountUp
              from={0}
              to={300}
              className="text-4xl text-yellow-600 dark:text-yellow-500 !font-semibold"
              duration={1}
              onEnd={(elem) => elem.innerText += "+"}/>
            <span className="text-secondary-foreground">仓库获Star总数</span>
          </div>
          <div className="pl-6">
            <SplitText
              text="A"
              className="text-4xl font-semibold overflow-visible"
              delay={150}
              duration={1}
              ease="power3.out"
              splitType="words"
              textAlign="left"
              onLetterAnimationComplete={() => {}}/>
            <span className="text-secondary-foreground">Github 账号评级</span>
          </div>
        </div>
      </div>
    </section>
  );
}
