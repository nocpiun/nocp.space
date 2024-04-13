import React, { PropsWithChildren } from "react";

interface WidgetProps extends PropsWithChildren {
    title: string | React.ReactElement
    className?: string
}

const Widget: React.FC<WidgetProps> = (props) => {
    return (
        <div>
            <h2 className="text-center mb-6">
                <span className="font-semibold pl-3 pr-3 border-l-4 border-r-4 border-[--nocp-green]">{props.title}</span>
            </h2>

            <div className={"p-6 bg-[--nocp-dark-gray] rounded "+ (props.className ?? "")}>
                {props.children}
            </div>
        </div>
    );
}

export default Widget;

