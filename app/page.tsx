"use client";

import dynamic from "next/dynamic";
import { Banner } from "./banner";
import { TechStacks } from "./tech-stacks";
import { OPanel } from "./opanel";
import { ProjectsTable } from "./projects-table";
import { GitalkComments } from "@/components/gitalk-comments";

const Calcium = dynamic(() => import("./calcium"), { ssr: false });

export default function Home() {
  return (
    <div className="page-padding pb-10 flex flex-col gap-20 overflow-y-auto overflow-x-hidden [&_span]:font-light">
      {/* Header */}
      <Banner />

      {/* Tech Stacks */}
      <TechStacks />

      {/* OPanel Section */}
      <OPanel />

      {/* Calcium Section */}
      <Calcium />

      {/* Projects */}
      <ProjectsTable />

      {/* Message Board */}
      <section>
        <h2 className="text-4xl font-semibold text-center">留言板</h2>
        <GitalkComments issue={1}/>
      </section>
    </div>
  );
}
