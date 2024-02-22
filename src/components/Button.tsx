import React, { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
    className?: string
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button
            className={"border-none outline-none bg-[var(--nocp-light-green)] hover:bg-[var(--nocp-green)] text-[var(--nocp-forebg)] rounded pt-2 pb-2 pl-5 pr-5 "+ props.className}
            onClick={() => {
                props.onClick && props.onClick();
            }}>{props.children}</button>
    );
}

export default Button;
