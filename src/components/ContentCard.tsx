import React, { PropsWithChildren } from "react";

interface ContentCardProps extends PropsWithChildren {
    title: string
    className?: string
}

const ContentCard: React.FC<ContentCardProps> = (props) => {
    return (
        <div className="text-center">
            <h2 className="text-4xl font-semibold">{props.title}</h2>

            <div className={"mt-16 "+ (props.className ?? "")}>{props.children}</div>
        </div>
    );
}

export default ContentCard;
