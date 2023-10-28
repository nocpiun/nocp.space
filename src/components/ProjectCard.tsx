import React from "react";

import Link from "@/components/Link";

interface ProjectCardProps {
    name: string
    year: number
    description: string | React.ReactElement
    url?: string
    repo: string
}

const repoPrefix: string = "https://github.com/";

const ProjectCard: React.FC<ProjectCardProps> = (props) => {
    return (
        <div className="w-[100%] h-[235px] border border-solid border-[--nocp-gray] rounded overflow-hidden inline-flex flex-col justify-between">
            <div className="text-left p-6 pb-0">
                <div className="mb-5 flex justify-between">
                    <a className="text-2xl font-semibold cursor-pointer hover:underline hover:text-emerald-600" href={props.url ?? repoPrefix + props.repo} target="_blank" rel="noreferrer">
                        <span className="text-[--nocp-forebg]">{props.name}</span>
                    </a>

                    <span className="text-sm text-yellow-500 pt-1">{props.year}</span>
                </div>

                <p className="leading-7 text-[--nocp-light-gray] whitespace-normal">{props.description}</p>
            </div>

            <div className="text-left p-6 flex justify-between">
                <div className="space-x-4">
                    <Link to={repoPrefix + props.repo} newTab>Github</Link>
                    {props.url && <Link to={props.url} newTab>Demo</Link>}
                </div>

                <div>
                    <object data={"https://img.shields.io/github/stars/"+ props.repo +"?style=social&label=Star"} aria-label="Github Stars"></object>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
