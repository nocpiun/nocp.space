import React from "react";

import Link from "@/components/Link";

interface BadgeProps {
    text: string
    color: string
    logo: string
    logoColor: string
    linkTo: string
}

const Badge: React.FC<BadgeProps> = (props) => {
    return (
        <Link to={props.linkTo} underline={false}>
            <img src={"https://img.shields.io/badge/"+ props.text +"-"+ props.color +"?logo="+ props.logo +"&logoColor="+ props.logoColor} alt="badge"/>
        </Link>
    );
}

export default Badge;
