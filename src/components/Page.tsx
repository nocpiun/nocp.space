import React, { PropsWithChildren } from "react";

import Footer from "@/components/Footer";

interface PageProps extends PropsWithChildren {
    className?: string
}

const Page: React.FC<PageProps> = (props) => {
    return (
        <div className={"h-[100vh] flex flex-col overflow-y-auto "+ props.className} id="page">
            {props.children}

            <Footer />
        </div>
    );
}

export default Page;
