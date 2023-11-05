/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Page from "@/components/Page";
import Section from "@/components/Section";
import ArticleCard from "@/components/ArticleCard";

import { hasTag, getBlogsByTag } from "@/blog-system";
import { Blog } from "@/types";

import styles from "./blog-tag.module.less";

interface BlogTagParams {
    [tagName: string]: string
}

const BlogTag: React.FC = () => {
    const { tagName } = useParams<BlogTagParams>();
    const [articleList, setArticleList] = useState<Blog[]>([]);
    const tagNameDecoded = decodeURI(tagName ?? "");

    useEffect(() => {
        if(!hasTag(tagNameDecoded)) {
            window.location.href = "/tags";
            return;
        }

        setArticleList(getBlogsByTag(tagNameDecoded));
    }, []);

    return (
        <Page className={"pt-40 "+ styles["page-content"]}>
            <Section title={"#"+ tagNameDecoded} titleCenterAligned={false} className="pl-96 pr-96 space-y-4">
                {
                    articleList.map((info, index) => {
                        return <ArticleCard {...info} key={index}/>;
                    })
                }
            </Section>
        </Page>
    );
}

export default BlogTag;
