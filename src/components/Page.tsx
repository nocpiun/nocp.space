import React, { PropsWithChildren, useEffect } from "react";
import useMetaTags from "react-metatags-hook";

import Footer from "@/components/Footer";

import { siteName } from "@/global";
import Emitter from "@/utils/Emitter";

interface PageProps extends PropsWithChildren {
    title: string
    singleTitle?: boolean
    className?: string
}

const Page: React.FC<PageProps> = (props) => {
    const pageTitle = (props.singleTitle ? "" : (siteName +" - "))+ props.title;

    useMetaTags({
        title: pageTitle,
        openGraph: {
            title: pageTitle,
        },
        twitter: {
            title: pageTitle,
        }
    });

    useEffect(() => {
        Emitter.get().emit("page-update");
    }, []);

    return (
        <div className={"h-[100vh] flex flex-col overflow-y-auto "+ props.className} id="page">
            {props.children}

            <Footer />
        </div>
    );
}

export default Page;
