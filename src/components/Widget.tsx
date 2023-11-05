import React, { PropsWithChildren } from "react";

interface WidgetProps extends PropsWithChildren {
    title: string | React.ReactElement
    className?: string
}

const Widget: React.FC<WidgetProps> = (props) => {
    return (
        <div>
            <h2 className="text-center font-semibold mb-6">
                {props.title}
            </h2>

            <div className={"p-6 bg-[--nocp-dark-gray] rounded "+ (props.className ?? "")}>
                {props.children}
            </div>
        </div>
    );
}

export default Widget;

