import React, { useState, useEffect } from "react";

import Page from "@/components/Page";
import Section from "@/components/Section";
import TagCard from "@/components/TagCard";

import { getTagList } from "@/blog-system";
import { BlogTag } from "@/types";

import styles from "./blog-tags.module.less";

const BlogTags: React.FC = () => {
    const [tagList, setTagList] = useState<BlogTag[]>([]);

    useEffect(() => {
        setTagList(getTagList());
    }, []);

    return (
        <Page className={"pt-40 "+ styles["page-content"]}>
            <Section title="标签列表" titleCenterAligned={false} className="pl-96 pr-96 grid grid-cols-3 gap-4">
                {
                    tagList.map((info, index) => <TagCard {...info} key={index}/>)
                }
            </Section>
        </Page>
    );
}

export default BlogTags;
