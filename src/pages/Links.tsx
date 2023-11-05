import React from "react";

import Page from "@/components/Page";
import Section from "@/components/Section";
import Link from "@/components/Link";
import LinkCard from "@/components/LinkCard";

import styles from "./links.module.less";

// Data
import links from "@/data/links.json";

const Links: React.FC = () => {
    return (
        <Page className={"pt-40 "+ styles["page-content"]}>
            <Section title="友情链接" className="pl-96 pr-96">
                <div className="grid grid-cols-3 gap-4">
                    {
                        links.map((info, index) => <LinkCard {...info} key={index}/>)
                    }
                </div>

                <div className="text-left pt-10 space-y-3">
                    <h2 className="font-semibold">友链说明</h2>
                    <p>如果你也想与我交换友链，敬请发邮件到<Link to="mailto:nriot233@gmail.com">我的邮箱</Link>，我会不定时查看更新的！(我猜不会有什么人来的)</p>
                </div>
            </Section>
        </Page>
    );
}

export default Links;
