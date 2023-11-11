import React from "react";

import Page from "@/components/Page";
import Section from "@/components/Section";
import Link from "@/components/Link";

const NotFound: React.FC = () => {
    return (
        <Page className="pt-40">
            <Section title="404 Not Found!" titleCenterAligned={false} className="pl-[20vw] pr-[20vw] max-lg:pl-[5vw] max-lg:pr-[5vw] max-sm:pl-[40px] max-sm:pr-[40px] space-y-3 text-left">
                <p>无法找到此页面！你可以选择：</p>
                <p className="font-semibold">
                    <Link to="/">返回主页</Link>
                </p>
            </Section>
        </Page>
    );
}

export default NotFound;
