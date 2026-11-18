import Link from "next/link";
import { ExternalLink } from "lucide-react";

import projects from "@/data/info/projects.json";

export function ProjectsTable() {
  return (
    <section className="flex gap-24 max-lg:flex-col max-lg:gap-10">
      <h2 className="text-3xl font-semibold">其他项目</h2>
      <div className="flex-1 flex flex-col gap-4">
        {projects.map((item, i) => (
          <Link
            href={`https://github.com/${item.repo}`}
            target="_blank"
            className="flex justify-between max-md:flex-col max-md:gap-2 pb-4 border-b last:border-0 no-underline"
            key={i}>
            <span className="flex-1 !font-semibold text-foreground">{item.name}</span>
            <div className="flex-1 flex justify-between items-center">
              <span className="text-secondary-foreground hover:underline">
                <ExternalLink size={17} className="inline-block mr-2"/>
                {item.repo}
              </span>
              <span className="text-sm text-yellow-600">{item.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
