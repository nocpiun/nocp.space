import React, { useState, useEffect } from "react";

import Page from "@/components/Page";
import Section from "@/components/Section";
import ArticleCard from "@/components/ArticleCard";

import { getBlogList } from "@/blog-system";
import { Blog } from "@/types";

import styles from "./blog-overview.module.less";

const BlogOverview: React.FC = () => {
    const [articleList, setArticleList] = useState<Blog[]>([]);

    useEffect(() => {
        setArticleList(getBlogList(true));
    }, []);

    return (
        <Page className={"pt-40 "+ styles["page-content"]}>
            <Section title="文章" titleCenterAligned={false} className="pl-96 pr-96 space-y-4">
                {
                    articleList.map((info, index) => {
                        if(info.hidden) return <React.Fragment key={index}/>;
                        return <ArticleCard {...info} key={index}/>;
                    })
                }
            </Section>
        </Page>
    );
}

export default BlogOverview;
