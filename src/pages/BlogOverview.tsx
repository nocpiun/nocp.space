import React, { useState, useEffect } from "react";

import Page from "@/components/Page";
import Link from "@/components/Link";
import ArticleCard from "@/components/ArticleCard";

import { getBlogList, getTagList } from "@/blog-system";
import { Blog, BlogTag } from "@/types";
import { getRelativeNumber } from "@/utils";

import styles from "./blog-overview.module.less";

const BlogOverview: React.FC = () => {
    const [articleList, setArticleList] = useState<Blog[]>([]);
    const [tagList, setTagList] = useState<BlogTag[]>([]);

    useEffect(() => {
        setArticleList(getBlogList(true));
        setTagList(getTagList());
    }, []);

    return (
        <Page className={styles["page-content"]}>
            <div className="min-h-[300px] mb-10 relative">
                <div className={"w-[100%] min-h-[300px] pt-10 absolute top-0 left-0 right-0 bottom-0 text-center space-y-3 flex flex-col justify-center z-10 "+ styles["banner"]}>
                    <h1 className="font-semibold">NBlog</h1>
                    <p className="text-lg">由一条咸鱼搭建的博客</p>
                </div>
                <div className={"w-[100%] min-h-[300px] absolute top-0 left-0 right-0 bottom-0 blur-[15px] "+ styles["banner-blur"]}/>
            </div>

            <div className="flex-1 pl-96 pr-96">
                <div className="flex">
                    <div className="w-[75%] flex flex-col">
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

                    <div className="flex-1 ml-4">
                        <h2 className="text-center font-semibold mb-6">
                            <Link to="/tags" large>标签</Link>
                        </h2>

                        <div className="p-6 bg-[--nocp-dark-gray] rounded">
                            {
                                tagList.map((tag, index) => {
                                    return (
                                        <span className="ml-1 mr-1" style={{ fontSize: getRelativeNumber(12, 65, tag.amount) +"px" }} key={index}>
                                            <Link to={"/tags/"+ tag.name}>{"#"+ tag.name}</Link>
                                        </span>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

export default BlogOverview;
