import React from "react";

import Page from "@/components/Page";
import ContentCard from "@/components/ContentCard";
import Link from "@/components/Link";

import styles from "./treasure-chest.module.less";

interface TreasureProps {
    name: string
    url: string
    description: string
}

const Treasure: React.FC<TreasureProps> = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td><Link to={props.url} newTab>戳我</Link></td>
            <td>{props.description}</td>
        </tr>
    );
}

const TreasureChest: React.FC = () => {
    return (
        <Page className={"pt-40 "+ styles["page-content"]}>
            <ContentCard title="百宝箱" className="space-y-2">
                <p>在这个百宝箱中，有我制作的小工具和小游戏，以及我整的各种有意思的东西。</p>
                <p>如果你感兴趣的话，可以在我的<Link to="https://github.com/NriotHrreion" newTab>Github</Link>中找到源码。</p>

                <table border={1} className="ml-auto mr-auto text-[--nocp-forebg]">
                    <thead>
                        <th>名称</th>
                        <th>链接</th>
                        <th>简介</th>
                    </thead>
                    <tbody>
                        <Treasure name="Calcium 计算器" url="https://calcium.js.org" description="一个基于Web的多功能计算器"/>
                        <Treasure name="Ferrum Explorer" url="https://ferrum-demo.nin.red" description="一个基于Web的文件浏览器"/>
                        <Treasure name="ICraft" url="https://ic-game-df35eb.netlify.app/client" description="Minecraft 2D"/>
                        <Treasure name="Nocp Startpage" url="https://nriothrreion.github.io/Nocp-startpage/" description="更简洁的Chrome新标签页"/>
                        <Treasure name="Function Painting" url="/using/function-painting/" description="函数图像生成器"/>
                        <Treasure name="CPS 检测器" url="/using/cps/" description="检测你的每秒钟点击速度"/>
                        <Treasure name="Do Terminal" url="https://github.com/NriotHrreion/Do-Terminal" description="检测你的每秒钟点击速度"/>
                        <Treasure name="控制台小游戏" url="https://nriothrreion.github.io/Console-game/" description="有趣的文字冒险游戏"/>
                        <Treasure name="计算出题器" url="https://math.nin.red" description="给懒得出题的小学生家长们的福利"/>
                        <Treasure name="网络聊天室" url="https://github.com/NriotHrreion/chat-server" description="Nodejs + Websocket 聊天室"/>
                        <Treasure name="Minecraft 井字棋" url="https://github.com/NriotHrreion/Bukkit-Tictactoe" description="用MC的方式打开井字棋"/>
                        <Treasure name="Java 贪吃蛇" url="https://github.com/NriotHrreion/Snake-game" description="用Java的方式打开贪吃蛇"/>
                    </tbody>
                </table>
            </ContentCard>
        </Page>
    );
}

export default TreasureChest;
