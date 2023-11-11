import React, { PropsWithChildren } from "react";
import { Link as RouteLink } from "react-router-dom";

import { optional } from "@/utils";

interface LinkProps extends PropsWithChildren {
    to: string
    newTab?: boolean
    icon?: string
    underline?: boolean
    large?: boolean
    className?: string
}

const Link: React.FC<LinkProps> = (props) => {
    if(props.large) {
        return (
            <RouteLink
                className={"text-2xl font-semibold cursor-pointer hover:underline hover:text-emerald-600 "+ (props.className ?? "")}
                to={props.to}
                target={props.newTab ? "_blank" : "_self"}
                rel="noreferrer">
                <span className="text-[--nocp-forebg]">{props.children}</span>
            </RouteLink>
        );
    }

    return (
        <RouteLink
            className="inline-block"
            to={props.to}
            target={props.newTab ? "_blank" : "_self"}
            rel="noreferrer">
                {props.icon && (
                    <img src={props.icon} alt="icon" className="w-5 h-5 inline-block mr-1"/>
                )}
                <span className={"text-emerald-600 selection:text-white inline-block "+ (props.className ?? "") + optional(" hover:underline", "", props.underline)}>{props.children}</span>
        </RouteLink>
    );
}

export default Link;
