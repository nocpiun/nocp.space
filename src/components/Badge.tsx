import React from "react";

import Link from "@/components/Link";

import { BadgeInfo } from "@/types";

const Badge: React.FC<BadgeInfo> = (props) => {
    return (
        <Link to={props.linkTo} underline={false}>
            <img src={"https://img.shields.io/badge/"+ props.text +"-"+ props.color +"?logo="+ props.logo +"&logoColor="+ props.logoColor} alt="badge"/>
        </Link>
    );
}

export default Badge;
