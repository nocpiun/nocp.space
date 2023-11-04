/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Page from "@/components/Page";
import Section from "@/components/Section";

import { getBlogByTitle } from "@/blog-system";
import { Blog } from "@/types";

import styles from "./blog-overview.module.less";

interface BlogArticleParams {
    [title: string]: string
}

const BlogArticle: React.FC = () => {
    const { title } = useParams<BlogArticleParams>();
    const [blogInfo, setBlogInfo] = useState<Blog>();
    const titleDecoded = decodeURI(title ?? "");

    useEffect(() => {
        var info = getBlogByTitle(titleDecoded);
        if(!info) {
            window.location.href = "/404";
            return;
        }

        setBlogInfo(info);
    }, []);

    return (
        <Page className={"pt-40 "+ styles["page-content"]}>
            <Section title={titleDecoded} titleCenterAligned={false} className="pl-96 pr-96 space-y-3 text-left">
                
            </Section>
        </Page>
    );
}

export default BlogArticle;
