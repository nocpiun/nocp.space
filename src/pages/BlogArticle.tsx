/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js";

import Page from "@/components/Page";
import Section from "@/components/Section";
import Link from "@/components/Link";

import { getBlogByTitle } from "@/blog-system";
import { Blog } from "@/types";

import styles from "./blog-article.module.less";

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

    useEffect(() => {
        hljs.highlightAll();
        (window as any).renderMathInElement(document.body, (window as any).katex_config);
    }, [blogInfo]);

    return (
        <Page className={"pt-40 "+ styles["page-content"]}>
            <Section title={titleDecoded} titleCenterAligned={false} className={"mt-8 pl-96 pr-96 space-y-3 text-left "+ styles["article-content"]}>
                <div className="mb-8 space-x-4">
                    <span className="text-[--nocp-light-gray]">By NoahHrreion</span>
                    
                    <span className="text-sm text-yellow-500 pt-1">
                        {(() => {
                            if(!blogInfo) return;

                            const date = new Date(blogInfo?.date);
                            const year = date.getFullYear();
                            const month = date.getMonth() + 1;
                            const day = date.getDate();

                            return year +"-"+ (month < 10 ? "0"+ month : month) +"-"+ (day < 10 ? "0"+ day : day);
                        })()}
                    </span>

                    <span className="space-x-3">
                        {blogInfo?.tags.map((tag, index) => <Link to={"/tags/"+ tag} key={index}>{"#"+ tag}</Link>)}
                    </span>
                </div>

                <Markdown options={{ wrapper: "article" }}>{blogInfo?.__content ?? ""}</Markdown>
            </Section>
        </Page>
    );
}

export default BlogArticle;
