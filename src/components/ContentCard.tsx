import React, { PropsWithChildren } from "react";

import { optional } from "@/utils";

interface ContentCardProps extends PropsWithChildren {
    title: string
    className?: string
    titleCenterAligned?: boolean
}

const ContentCard: React.FC<ContentCardProps> = (props) => {
    return (
        <div className="text-center">
            <h2 className={"text-4xl font-semibold "+ optional("text-center", "text-left pl-96", props.titleCenterAligned)}>{props.title}</h2>

            <div className={"mt-16 "+ (props.className ?? "")}>{props.children}</div>
        </div>
    );
}

export default ContentCard;
