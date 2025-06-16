import { Banner } from "./banner";
import { TechStacks } from "./tech-stacks";
import { ProjectsTable } from "./projects-table";
import { GitalkComments } from "@/components/gitalk-comments";

export default function Home() {
  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden">
      {/* Homepage */}
      <Banner />

      {/* Tech Stacks */}
      <section className="mb-12">
        <h2 className="text-4xl font-semibold page-padding">技术栈</h2>
        
        <TechStacks />
      </section>

      {/* Projects */}
      <section className="space-y-7 page-padding mb-12">
        <h2 className="text-4xl font-semibold">个人项目</h2>
        <p>这是我曾经制作过的一些小项目，这些项目均是在课余时间完成。</p>

        <ProjectsTable />
      </section>

      {/* Message Board */}
      <section className="page-padding">
        <h2 className="text-4xl font-semibold">留言板</h2>
        
        <GitalkComments issue={1}/>
      </section>
    </div>
  );
}
