import React from "react";

import Link from "@/components/Link";

import { Blog } from "@/types";

const ArticleCard: React.FC<Blog> = (props) => {
    const date = new Date(props.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const url = encodeURI("/blog/"+ props.title);

    return (
        <div className="w-[100%] h-[235px] bg-[--nocp-dark-gray] rounded overflow-hidden inline-flex flex-col justify-between">
            <div className="text-left p-6 pb-0">
                <div className="mb-5 flex justify-between">
                    <Link to={url} large>{props.title}</Link>

                    <span className="text-sm text-yellow-500 pt-1">
                        {year +"-"+ (month < 10 ? "0"+ month : month) +"-"+ (day < 10 ? "0"+ day : day)}
                    </span>
                </div>

                <p className="leading-7 text-[--nocp-light-gray] whitespace-normal">{props.excerpt}</p>
            </div>

            <div className="text-left p-6 space-x-4">
                <Link to={url}>查看更多</Link>
            </div>
        </div>
    );
}

export default ArticleCard;
