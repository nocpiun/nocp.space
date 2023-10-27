import React from "react";

interface NavbarButtonProps {
    text: string
    linkTo?: string
    onClick?: () => void
}

const NavbarButton: React.FC<NavbarButtonProps> = (props) => {
    const handleClick = () => {
        if(props.onClick) props.onClick();
        if(props.linkTo) window.location.href = props.linkTo;
    };

    return (
        <button
            className="text-[--nocp-forebg] hover:text-[--nocp-forebg-hovered] active:text-[--nocp-forebg-active]"
            onClick={() => handleClick()}>{props.text}</button>
    );
}

export default NavbarButton;
