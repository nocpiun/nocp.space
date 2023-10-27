import React from "react";

import Link from "@/components/Link";

interface BadgeProps {
    url: string
    linkTo: string
}

const Badge: React.FC<BadgeProps> = (props) => {
    return (
        <Link to={props.linkTo} underline={false}>
            <img src={props.url} alt="badge"/>
        </Link>
    );
}

export default Badge;
