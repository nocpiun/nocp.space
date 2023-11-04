import React, { PropsWithChildren } from "react";

import { optional } from "@/utils";

interface LinkProps extends PropsWithChildren {
    to: string
    newTab?: boolean
    icon?: string
    underline?: boolean
    large?: boolean
}

const Link: React.FC<LinkProps> = (props) => {
    if(props.large) {
        return (
            <a
                className="text-2xl font-semibold cursor-pointer hover:underline hover:text-emerald-600"
                href={props.to}
                target={props.newTab ? "_blank" : "_self"}
                rel="noreferrer">
                <span className="text-[--nocp-forebg]">{props.children}</span>
            </a>
        );
    }

    return (
        <a
            className="inline-block"
            href={props.to}
            target={props.newTab ? "_blank" : "_self"}
            rel="noreferrer">
                {props.icon && (
                    <img src={props.icon} alt="icon" className="w-5 h-5 inline-block mr-1"/>
                )}
                <span className={"text-emerald-600 selection:text-white inline-block"+ optional(" hover:underline", "", props.underline)}>{props.children}</span>
        </a>
    );
}

export default Link;
