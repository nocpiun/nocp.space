import React, { useState, useEffect } from "react";

import Page from "@/components/Page";
import Link from "@/components/Link";
import ArticleCard from "@/components/ArticleCard";
import Widget from "@/components/Widget";

import { BlogSystem } from "@/blog-system";
import { Blog, BlogTag } from "@/types";
import { getRelativeNumber } from "@/utils";

import styles from "./blog-overview.module.less";

// Data
import recommended from "@/data/recommended.json";

const BlogOverview: React.FC = () => {
    const [articleList, setArticleList] = useState<Blog[]>([]);
    const [tagList, setTagList] = useState<BlogTag[]>([]);

    useEffect(() => {
        setArticleList(BlogSystem.get().getBlogList());
        setTagList(BlogSystem.get().getTagList());
    }, []);

    return (
        <Page title="博客" className={styles["page-content"]}>
            <div className="min-h-[300px] mb-10 relative">
                <div className={"w-[100%] min-h-[300px] pt-10 absolute top-0 left-0 right-0 bottom-0 text-center space-y-3 flex flex-col justify-center z-10 "+ styles["banner"]}>
                    <h1 className="font-semibold font-mono text-5xl">NBlog</h1>
                    <p className="text-lg">由一条咸鱼搭建的博客</p>
                </div>
                <div className={"w-[100%] min-h-[300px] absolute top-0 left-0 right-0 bottom-0 blur-[15px] "+ styles["banner-blur"]}/>
            </div>

            <div className="flex-1 pl-[25vw] pr-[25vw] max-lg:pl-[5vw] max-lg:pr-[5vw] max-sm:pl-[40px] max-sm:pr-[40px]">
                <div className="flex">
                    <div className="w-[70%] max-md:w-[100%] flex flex-col">
                        <h2 className="text-left font-semibold mb-6">文章列表</h2>

                        <div className="space-y-4">
                            {
                                articleList.map((info, index) => {
                                    if(info.hidden) return <React.Fragment key={index}/>;
                                    return <ArticleCard {...info} key={index}/>;
                                })
                            }
                        </div>
                    </div>

                    <div className="flex-1 ml-8 flex flex-col space-y-6 max-md:hidden">
                        <Widget title="推荐阅读" className="text-sm space-y-2">
                            {
                                recommended.map((title, index) => <Link to={"/blog/"+ title} key={index}>{title}</Link>)
                            }
                        </Widget>

                        <Widget title={<Link to="/tags" large>标签</Link>}>
                            {
                                tagList.map((tag, index) => {
                                    return (
                                        <span className="ml-1 mr-1" style={{ fontSize: getRelativeNumber(12, 35, tag.amount, articleList.length) +"px" }} key={index}>
                                            <Link to={"/tags/"+ tag.name}>{"#"+ tag.name}</Link>
                                        </span>
                                    );
                                })
                            }
                        </Widget>

                        <Widget title="订阅" className="text-center">
                            {/* Use absolute path here */}
                            <Link to="https://nocp.space/feed.xml" newTab>RSS Feed (atom)</Link>
                            <Link to="https://nocp.space/feed.json" newTab>RSS Feed (json)</Link>
                        </Widget>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default BlogOverview;
