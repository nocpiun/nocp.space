import React from "react";
import { Link as RouteLink } from "react-router-dom";

interface NavbarButtonProps {
    text: string
    linkTo: string
    className?: string
}

const NavbarButton: React.FC<NavbarButtonProps> = (props) => {
    return (
        <RouteLink
            className={"text-[--nocp-forebg] flex flex-col justify-center "+ (props.className ?? "")}
            to={props.linkTo}
            target="_self"
            rel="noreferrer">
                <span>{props.text}</span>
        </RouteLink>
    );
}

export default NavbarButton;
