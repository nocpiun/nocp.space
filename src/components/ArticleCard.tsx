import React from "react";

import Link from "@/components/Link";

import { Blog } from "@/types";

const ArticleCard: React.FC<Blog> = (props) => {
    const date = new Date(props.date);

    return (
        <div className="w-[100%] h-[235px] bg-[--nocp-dark-gray] rounded overflow-hidden inline-flex flex-col justify-between">
            <div className="text-left p-6 pb-0">
                <div className="mb-5 flex justify-between">
                    <Link to={"/blog/"+ props.id} newTab large>{props.title}</Link>

                    <span className="text-sm text-yellow-500 pt-1">{date.getFullYear() +"-"+ (date.getMonth() + 1) +"-"+ date.getDate()}</span>
                </div>

                <p className="leading-7 text-[--nocp-light-gray] whitespace-normal">{props.excerpt}</p>
            </div>

            <div className="text-left p-6 space-x-4">
                <Link to={"/blog/"+ props.id} newTab>查看更多</Link>
            </div>
        </div>
    );
}

export default ArticleCard;
