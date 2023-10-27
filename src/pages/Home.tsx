import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";
import Badge from "@/components/Badge";

import styles from "./home.module.less";

const Home: React.FC = () => {
    return (
        <div className={"h-[100vh] flex flex-col overflow-y-auto "+ styles["page-content"]} id="page">
            <Header />

            <div className="flex flex-col space-y-28 pt-32">
                <ContentCard title="技术栈" className="space-x-2 space-y-2">
                    <Badge url="https://img.shields.io/badge/-Javascript-FFE70B?logo=Javascript&logoColor=fff" linkTo="https://javascript.com"/>
                    <Badge url="https://img.shields.io/badge/-Typescript-3178C6?logo=Typescript&logoColor=fff" linkTo="https://typescriptlang.org"/>
                    <Badge url="https://img.shields.io/badge/Node.js-026E00?logo=node.js&logoColor=fff" linkTo="https://nodejs.org"/>
                    <Badge url="https://img.shields.io/badge/Java-E61F24.svg?logo=java&logoColor=fff" linkTo="https://java.com"/>
                    <br />
                    <Badge url="https://img.shields.io/badge/Webpack-175d96?logo=webpack&logoColor=fff" linkTo="https://webpack.js.org"/>
                    <Badge url="https://img.shields.io/badge/Babel-323330?logo=babel&logoColor=f5da55" linkTo="https://babeljs.io"/>
                    <Badge url="https://img.shields.io/badge/React.js-4598B0?logo=react&logoColor=fff" linkTo="https://react.dev"/>
                    <Badge url="https://img.shields.io/badge/Less-1D365D?logo=less&logoColor=fff" linkTo="https://lesscss.org"/>
                    <Badge url="https://img.shields.io/badge/Tailwind CSS-0EA5E9?logo=tailwindcss&logoColor=fff" linkTo="https://tailwindcss.com"/>
                    <br />
                    <Badge url="https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white" linkTo="https://git-scm.com"/>
                    <Badge url="https://img.shields.io/badge/npm-CB0000?logo=npm&logoColor=fff" linkTo="https://npmjs.com"/>
                    <Badge url="https://img.shields.io/badge/Docker-086DD7?logo=docker&logoColor=fff" linkTo="https://docker.com"/>
                    <Badge url="https://img.shields.io/badge/VSCode-0066B8.svg?logo=visualstudiocode&logoColor=fff" linkTo="https://code.visualstudio.com"/>
                </ContentCard>

                <ContentCard title="项目">

                </ContentCard>
            </div>

            <Footer />
        </div>
    );
}

export default Home;
