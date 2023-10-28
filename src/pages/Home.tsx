import React from "react";

import Page from "@/components/Page";
import Header from "@/components/Header";
import ContentCard from "@/components/ContentCard";
import Badge from "@/components/Badge";
import ProjectCard from "@/components/ProjectCard";

import styles from "./home.module.less";

const Home: React.FC = () => {
    return (
        <Page className={styles["page-content"]}>
            <Header />

            <div className="flex flex-col space-y-28 pt-32">
                <ContentCard title="技术栈" className="space-x-2 space-y-2">
                    <Badge text="Javascript" color="FFE70B" logo="Javascript" logoColor="fff" linkTo="https://javascript.com"/>
                    <Badge text="Typescript" color="3178C6" logo="Typescript" logoColor="fff" linkTo="https://typescriptlang.org"/>
                    <Badge text="Node.js" color="026E00" logo="node.js" logoColor="fff" linkTo="https://nodejs.org"/>
                    <Badge text="Java" color="E61F24" logo="java" logoColor="fff" linkTo="https://java.com"/>
                    <br />
                    <Badge text="Webpack" color="175d96" logo="webpack" logoColor="fff" linkTo="https://webpack.js.org"/>
                    <Badge text="Babel" color="323330" logo="babel" logoColor="f5da55" linkTo="https://babeljs.io"/>
                    <Badge text="React.js" color="4598B0" logo="react" logoColor="fff" linkTo="https://react.dev"/>
                    <Badge text="Less" color="1D365D" logo="less" logoColor="fff" linkTo="https://lesscss.org"/>
                    <Badge text="Tailwind CSS" color="0EA5E9" logo="tailwindcss" logoColor="fff" linkTo="https://tailwindcss.com"/>
                    <br />
                    <Badge text="Git" color="F05032" logo="git" logoColor="white" linkTo="https://git-scm.com"/>
                    <Badge text="npm" color="CB0000" logo="npm" logoColor="fff" linkTo="https://npmjs.com"/>
                    <Badge text="Docker" color="086DD7" logo="docker" logoColor="fff" linkTo="https://docker.com"/>
                    <Badge text="VSCode" color="0066B8" logo="visualstudiocode" logoColor="fff" linkTo="https://code.visualstudio.com"/>
                </ContentCard>

                <ContentCard title="项目" className={"w-[1030px] ml-auto mr-auto pb-4 grid grid-cols-2 gap-3 "+ styles["project-cards"]}>
                    <ProjectCard
                        name="Calcium 计算器"
                        year={2022}
                        description={<>Calcium计算器是一个使用 React 和 Typescript 编写的多功能网页计算器，支持<b>基础计算</b>、<b>求和积分</b>、<b>变量存储</b>、<b>函数图像绘制</b>等等功能，且完全开源。</>}
                        url="https://calcium.js.org"
                        repo="nocpiun/calcium"/>
                    <ProjectCard
                        name="Ferrum Explorer"
                        year={2021}
                        description={<>Ferrum是一个使用 React 和 Typescript 编写的服务器文件管理器，支持<b>文件读写</b>、<b>文件操作</b>、<b>多种格式浏览</b>、<b>插件装载</b>等等功能，且完全开源。</>}
                        url="https://ferrum-demo.nin.red"
                        repo="nocpiun/ferrum"/>
                    <ProjectCard
                        name="Snake-ts"
                        year={2021}
                        description="这是一个用 Typescript 编写的贪吃蛇小游戏，里面不仅包含了贪吃蛇的基本玩法，还有炸弹、糖果等多种道具和玩法。"
                        url="https://snake-ts.nin.red"
                        repo="NriotHrreion/Snake-ts"/>
                    <ProjectCard
                        name="控制台小游戏"
                        year={2020}
                        description="欢迎来到这个住着小比特与老比特的后台城！在看似平常的一天中，一位黑客入侵了这个后台城，于是发生了许多故事... 这个小游戏较为简陋，因为它只是控制台游戏的一个小Demo。"
                        url="https://console-game.nin.red"
                        repo="NriotHrreion/Console-game"/>
                    <ProjectCard
                        name="HYCDGX 官网"
                        year={2022}
                        description="一个使用 React 和 Typescript 编写的Minecraft服务器官方网站。"
                        url="https://site.hycdgx.com"
                        repo="nocpiun/hycdgx"/>
                    <ProjectCard
                        name="EasyBedwars"
                        year={2023}
                        description="一个简单的起床战争服务端插件，基于Bukkit，包含了起床战争游戏的基本玩法。目前有部分功能暂未完工。"
                        repo="NriotHrreion/EasyBedwars"/>
                    <ProjectCard
                        name="ICraft"
                        year={2021}
                        description="这是Minecraft的2D版本，可以当画板用，或者拿来玩，和别人一起联机游戏。"
                        url="https://ic-game-df35eb.netlify.app/client/?map=&player=steven"
                        repo="NriotHrreion/ICraft-App"/>
                    <ProjectCard
                        name="Nocp Startpage"
                        year={2020}
                        description="一个Chrome浏览器插件，可以使你的浏览器新标签页更加简洁美观。这个项目是我的第一个个人项目。"
                        repo="NriotHrreion/Nocp-startpage"/>
                </ContentCard>
            </div>
        </Page>
    );
}

export default Home;
