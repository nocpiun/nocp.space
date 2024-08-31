import React, { useEffect } from "react";
import Gitalk from "gitalk";

import Page from "@/components/Page";
import Section from "@/components/Section";
import LinkCard from "@/components/LinkCard";
import { siteName } from "@/global";

import "gitalk/dist/gitalk.css";
import styles from "./links.module.less";

// Data
import links from "@/data/links.json";

const gitalkOptions = {
    clientID: "421789e625976ef96925",
    clientSecret: "bbafd76071d800d38b5b28c15933e8ae579f9522",
    repo: "nin.red-comments",
    owner: "NriotHrreion",
    admin: ["NriotHrreion"],
    number: 3
};

const Links: React.FC = () => {
    useEffect(() => {
        const gitalkInstance = new Gitalk(gitalkOptions);
        gitalkInstance.render("gitalk-container");
    }, []);

    return (
        <Page title="友链" className={"pt-40 space-y-28 "+ styles["page-content"]}>
            <Section title="友情链接" className="pl-[20vw] pr-[20vw] max-lg:pl-[5vw] max-lg:pr-[5vw] max-sm:pl-[40px] max-sm:pr-[40px]">
                <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
                    {
                        links.map((info, index) => <LinkCard {...info} key={index}/>)
                    }
                </div>

                <div className="text-left pt-10 space-y-3">
                    <h2 className="font-semibold">友链说明</h2>
                    <p>如果你也想与我交换友链，敬请在下方留言，附上你的网站信息，我会不定时查看更新的😉！(我猜不会有什么人来的)</p>
                    <h4 className="font-semibold pt-10">本站点信息</h4>
                    <p>名称: {siteName}</p>
                    <p>简介: 由一条咸鱼搭建的网站</p>
                    <p>URL: nin.red</p>
                    <p>颜色: <span className="bg-[--nocp-green]">#077955</span></p>
                </div>
            </Section>

            <Section title="留言板">
                <div id="gitalk-container"/>
            </Section>
        </Page>
    );
}

export default Links;
