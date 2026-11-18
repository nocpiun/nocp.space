import { featuredProjects } from "@nocp/shared";
import projects from "@/data/info/projects.json";
import { cliJson } from "../serialize";

export const dynamic = "force-static";

export function GET() {
  return cliJson({
    featured: featuredProjects,
    projects,
  });
}
