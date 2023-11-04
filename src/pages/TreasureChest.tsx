import React from "react";

import Page from "@/components/Page";
import Section from "@/components/Section";
import Link from "@/components/Link";

import { TreasureInfo } from "@/types";

import styles from "./treasure-chest.module.less";

import treasures from "@/data/treasure-chest.json";

const Treasure: React.FC<TreasureInfo> = (props) => {
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
            <Section title="百宝箱" className="space-y-2">
                <p>在这个百宝箱中，有我制作的小工具和小游戏，以及我整的各种有意思的东西。</p>
                <p>如果你感兴趣的话，可以在我的<Link to="https://github.com/NriotHrreion" newTab>Github</Link>中找到源码。</p>

                <table border={1} className="ml-auto mr-auto text-[--nocp-forebg]">
                    <thead>
                        <th>名称</th>
                        <th>链接</th>
                        <th>简介</th>
                    </thead>
                    <tbody>
                        {
                            treasures.map((info: TreasureInfo, index) => <Treasure {...info} key={index}/>)
                        }
                    </tbody>
                </table>
            </Section>
        </Page>
    );
}

export default TreasureChest;
