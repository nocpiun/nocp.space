import React, { PropsWithChildren } from "react";

import { optional } from "@/utils";

interface SectionProps extends PropsWithChildren {
    title: string
    id?: string
    photo?: string
    className?: string
    titleCenterAligned?: boolean
}

const Section: React.FC<SectionProps> = (props) => {
    return (
        <section className="text-center" id={props.id}>
            {props.photo && <div className="mb-12 pl-[20vw] pr-[20vw] max-lg:pl-[5vw] max-lg:pr-[5vw] max-sm:pl-0 max-sm:pr-0 max-sm:h-auto">
                <img className=" ml-auto mr-auto" src={props.photo} alt="banner"/>
            </div>}
            <h2 className={"z-10 text-4xl font-semibold "+ optional("text-center", "text-left pl-[20vw] pr-[20vw] max-lg:pl-[5vw] max-lg:pr-[5vw] max-sm:pl-[40px] max-sm:pr-[40px]", props.titleCenterAligned)}>{props.title}</h2>

            <div className={"mt-16 max-md:mt-12 "+ (props.className ?? "")}>{props.children}</div>
        </section>
    );
}

export default Section;
