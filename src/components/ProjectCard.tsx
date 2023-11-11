import React from "react";

import Link from "@/components/Link";

import { ProjectInfo } from "@/types";

const repoPrefix: string = "https://github.com/";

const ProjectCard: React.FC<ProjectInfo> = (props) => {
    return (
        <div className="w-[100%] max-md:w-[90vw] h-[235px] bg-[--nocp-dark-gray] rounded overflow-hidden inline-flex flex-col justify-between">
            <div className="text-left p-6 pb-0">
                <div className="mb-5 flex justify-between">
                    <Link to={props.url ?? repoPrefix + props.repo} newTab large>{props.name}</Link>

                    <span className="text-sm text-yellow-500 pt-1">{props.year}</span>
                </div>

                <p className="leading-7 text-[--nocp-light-gray] whitespace-normal" dangerouslySetInnerHTML={{ __html: props.description }}/>
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
