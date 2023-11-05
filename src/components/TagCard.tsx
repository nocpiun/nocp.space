import React from "react";

import Link from "@/components/Link";

import { BlogTag } from "@/types";

const TagCard: React.FC<BlogTag> = (props) => {
    const url = encodeURI("/tags/"+ props.name);

    return (
        <div className="bg-[--nocp-dark-gray] rounded overflow-hidden inline-flex flex-col justify-between">
            <div className="text-left p-6 pb-0">
                <div className="mb-5 flex justify-between">
                    <Link to={url} large>{"#"+ props.name}</Link>

                    {/* <span className="text-sm text-yellow-500 pt-1"></span> */}
                </div>

                <p className="card-excerpt">共 {props.amount} 篇博客</p>
            </div>

            <div className="text-left p-6 space-x-4">
                <Link to={url}>查看更多</Link>
            </div>
        </div>
    );
}

export default TagCard;
