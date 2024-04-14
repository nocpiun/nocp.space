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

    /* old version */
    // return (
    //     <div className="w-[100%] bg-[--nocp-dark-gray] rounded overflow-hidden inline-flex flex-col justify-between">
    //         <div className="text-left p-6 pb-0">
    //             <div className="mb-5 flex justify-between max-sm:flex-col">
    //                 <Link to={url} large>{props.title}</Link>

    //                 <span className="text-sm text-yellow-500 pt-1 max-sm:text-right max-sm:mt-2">
    //                     {year +"-"+ (month < 10 ? "0"+ month : month) +"-"+ (day < 10 ? "0"+ day : day)}
    //                 </span>
    //             </div>

    //             <div className="card-excerpt">
    //                 <Markdown>{props.excerpt ?? ""}</Markdown>
    //             </div>
    //         </div>

    //         <div className="text-left p-6 flex justify-between">
    //             <Link to={url} className="max-sm:hidden">查看更多</Link>

    //             <div className="space-x-4 article-card-tag-list">
    //                 {
    //                     props.tags.map((tag, index) => <Link to={"/tags/"+ tag} key={index}>{"#"+ tag}</Link>)
    //                 }
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
        <div className="mt-3 pb-3 space-y-2 border-b border-[--nocp-border-color] last:border-0 flex flex-col">
            <div className="flex justify-between">
                <Link to={url} large className="text-lg">{props.title}</Link>

                <span className="text-sm text-yellow-500 pt-1 max-sm:text-right max-sm:mt-2">
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
