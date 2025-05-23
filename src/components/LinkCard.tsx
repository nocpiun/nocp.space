import React from "react";

import Link from "@/components/Link";

import { LinkInfo } from "@/types";

const LinkCard: React.FC<LinkInfo> = (props) => {
    return (
        <div className="bg-[--nocp-dark-gray] rounded overflow-hidden flex">
            <div className="w-[128px] h-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url(" + props.avatar + ")" }}/>

            <div className="flex-1 flex flex-col justify-between text-left p-6">
                <div className="mb-5 flex justify-between">
                    <Link to={props.url} large newTab>{props.name}</Link>
                </div>

                <p className="card-excerpt">
                    <span>{props.description}</span>
                </p>
            </div>
        </div>
    );
}

export default LinkCard;
