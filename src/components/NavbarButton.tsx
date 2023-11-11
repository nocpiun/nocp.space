import React from "react";
import { Link as RouteLink } from "react-router-dom";

interface NavbarButtonProps {
    text: string
    linkTo: string
}

const NavbarButton: React.FC<NavbarButtonProps> = (props) => {
    return (
        <RouteLink
            className="text-[--nocp-forebg] flex flex-col justify-center hover:text-[--nocp-forebg-hovered] active:text-[--nocp-forebg-active]"
            to={props.linkTo}
            target="_self"
            rel="noreferrer">
                <span>{props.text}</span>
        </RouteLink>
    );
}

export default NavbarButton;
