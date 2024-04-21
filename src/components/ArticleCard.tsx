import React from "react";
import Markdown from "markdown-to-jsx";

import Link from "@/components/Link";

import { Blog } from "@/types";

const ArticleCard: React.FC<Blog> = (props) => {
    const date = new Date(props.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const url = encodeURI("/blog/"+ props.title);

    return (
        <div className="mt-3 pb-3 space-y-2 border-b border-[--nocp-border-color] last:border-0 flex flex-col">
            <div className="flex justify-between">
                <Link to={url} large className="text-lg">{props.title}</Link>

                <span className="text-sm text-yellow-500 whitespace-nowrap pt-1 max-sm:text-right">
                    {year +"-"+ (month < 10 ? "0"+ month : month) +"-"+ (day < 10 ? "0"+ day : day)}
                </span>
            </div>

            <div className="card-excerpt">
                <Markdown>{props.excerpt ?? ""}</Markdown>
            </div>
        </div>
    );
}

export default ArticleCard;
