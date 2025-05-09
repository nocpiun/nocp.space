import React, { useEffect } from "react";
import Gitalk from "gitalk";

import Page from "@/components/Page";
import Header from "@/components/Header";
import Section from "@/components/Section";
import Badge from "@/components/Badge";
import ProjectCard from "@/components/ProjectCard";
import Easter from "@/components/Easter";

import { ProjectInfo, BadgeInfo } from "@/types";

import "gitalk/dist/gitalk.css";
import styles from "./home.module.less";

// Data
import projects from "@/data/projects.json";
import badges from "@/data/badges.json";

const gitalkOptions = {
    clientID: "421789e625976ef96925",
    clientSecret: "bbafd76071d800d38b5b28c15933e8ae579f9522",
    repo: "nocp.space-comments",
    owner: "NriotHrreion",
    admin: ["NriotHrreion"],
    number: 1
};

const Home: React.FC = () => {
    useEffect(() => {
        const gitalkInstance = new Gitalk(gitalkOptions);
        gitalkInstance.render("gitalk-container");
    }, []);

    return (
        <Page title="主页" className={"overflow-x-hidden "+ styles["page-content"]}>
            <Header />

            <Easter />

            <div className="flex flex-col space-y-28 pt-32">
                <Section title="技术栈" className="space-x-2 space-y-2">
                    {
                        badges.map((badgeList: BadgeInfo[], index) => {
                            return (
                                <React.Fragment key={index}>
                                    {
                                        badgeList.map((info: BadgeInfo, index) => <Badge {...info} key={index}/>)
                                    }
                                    {index !== badges.length - 1 && <br />}
                                </React.Fragment>
                            );
                        })
                    }
                </Section>

                <Section title="项目" className={"w-[1030px] ml-auto mr-auto pb-4 grid grid-cols-2 gap-3 max-md:grid-cols-1 max-md:gap-5 max-md:pl-[5vw] max-md:pr-[5vw] "+ styles["project-cards"]}>
                    {
                        projects.map((info: ProjectInfo, index) => <ProjectCard {...info} key={index}/>)
                    }
                </Section>

                <Section title="留言板" id="comments">
                    <div id="gitalk-container"/>
                </Section>
            </div>
        </Page>
    );
}

export default Home;
