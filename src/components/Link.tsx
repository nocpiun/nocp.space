import React, { PropsWithChildren } from "react";

interface LinkProps extends PropsWithChildren {
    to: string
    newTab?: boolean
}

const Link: React.FC<LinkProps> = (props) => {
    return (
        <a
            className=" text-emerald-600 hover:underline"
            href={props.to}
            target={props.newTab ? "_blank" : "_self"}
            rel="noreferrer">
                {props.children}
        </a>
    );
}

export default Link;
