import React, { useEffect } from "react";
import Gitalk from "gitalk";

import Page from "@/components/Page";
import Header from "@/components/Header";
import ContentCard from "@/components/ContentCard";
import Badge from "@/components/Badge";
import ProjectCard from "@/components/ProjectCard";

import { ProjectInfo, BadgeInfo } from "@/types";

import "gitalk/dist/gitalk.css";
import styles from "./home.module.less";

// Data
import projects from "@/data/projects.json";
import badges from "@/data/badges.json";

const gitalkOptions = {
    clientID: "421789e625976ef96925",
    clientSecret: "bbafd76071d800d38b5b28c15933e8ae579f9522",
    repo: "nin.red-comments",
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
        <Page className={styles["page-content"]}>
            <Header />

            <div className="flex flex-col space-y-28 pt-32">
                <ContentCard title="技术栈" className="space-x-2 space-y-2">
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
                </ContentCard>

                <ContentCard title="项目" className={"w-[1030px] ml-auto mr-auto pb-4 grid grid-cols-2 gap-3 "+ styles["project-cards"]}>
                    {
                        projects.map((info: ProjectInfo, index) => <ProjectCard {...info} key={index}/>)
                    }
                </ContentCard>

                <ContentCard title="留言板">
                    <div id="gitalk-container"/>
                </ContentCard>
            </div>
        </Page>
    );
}

export default Home;
