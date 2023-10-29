import React, { useEffect } from "react";

import Page from "@/components/Page";
import ContentCard from "@/components/ContentCard";

// import { getBlog } from "@/blog-system";

import styles from "./blog-overview.module.less";

const BlogOverview: React.FC = () => {
    useEffect(() => {
        (async () => {
            /** @todo */
        })();
    }, []);

    return (
        <Page className={"pt-40 "+ styles["page-content"]}>
            <ContentCard title="文章" titleCenterAligned={false}>
                
            </ContentCard>
        </Page>
    );
}

export default BlogOverview;
