import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";

import Page from "@/components/Page";
import Section from "@/components/Section";
import Link from "@/components/Link";

import { BlogSystem } from "@/blog-system";
import { DynamicInfo } from "@/types";

import AvatarImg from "@/static/avatar.jpg";

import styles from "./dynamic.module.less";

const DynamicItem: React.FC<DynamicInfo> = (props) => {
    return (
        <div className="w-full flex flex-col">
            <div className="flex space-x-4">
                <Link className="flex flex-col justify-center" to="/">
                    <img className="w-12 rounded-full" src={AvatarImg} alt="avatar"/>
                </Link>
                <div className="flex flex-col justify-center text-left">
                    <Link className="!text-[--nocp-forebg] hover:no-underline font-semibold" to="/">NoahHrreion</Link>
                    <span className="text-sm text-yellow-500 pt-1">
                        {(() => {
                            const date = props.date;
                            const year = date.getFullYear();
                            const month = date.getUTCMonth() + 1;
                            const day = date.getUTCDate();
                            const hour = date.getUTCHours();
                            const minute = date.getUTCMinutes();

                            return (
                                year +"-"+
                                (month < 10 ? "0"+ month : month) +"-"+
                                (day < 10 ? "0"+ day : day) +" "+
                                (hour < 10 ? "0"+ hour : hour) +":"+
                                (minute < 10 ? "0"+ minute : minute)
                            );
                        })()}
                    </span>
                </div>
            </div>

            <div className="p-4 pl-16 space-y-2 max-sm:pl-4">
                <div className="font-bold text-lg text-left">
                    <span>{props.title}</span>
                </div>

                <div className="text-left">
                    <Markdown>{props.__content}</Markdown>
                </div>

                {(props.photoList && props.photoList.length > 1 && props.photoList.length <= 9) &&
                    <div className="grid grid-cols-[repeat(3,100px)] grid-rows-[repeat(3,100px)] max-sm:grid-cols-[repeat(3,70px)] max-sm:grid-rows-[repeat(3,70px)] gap-2 !mt-3">
                        {
                            props.photoList.map((url, index) => {
                                return (
                                    <Link className="w-full h-full" to={url} newTab key={index}>
                                        <img className="w-full h-full rounded object-cover" src={url} alt=""/>
                                    </Link>
                                );
                            })
                        }
                    </div>
                }

                {(props.photoList && props.photoList.length === 1) &&
                    <div className="text-left !mt-3">
                        <Link to={props.photoList[0]} newTab>
                            <img className="w-96 rounded object-cover" src={props.photoList[0]} alt=""/>
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
}

const Dynamic: React.FC = () => {
    const [dynamicList, setDynamicList] = useState<DynamicInfo[]>([]);

    useEffect(() => {
        setDynamicList(BlogSystem.get().getDynamicList());
    }, []);

    return (
        <Page title="自言自语" className={"pt-40 "+ styles["page-content"]}>
            <Section title="自言自语" className="pl-[27vw] pr-[27vw] flex flex-col space-y-4 max-lg:pl-[15vw] max-lg:pr-[15vw] max-sm:pl-[40px] max-sm:pr-[40px]">
                {
                    dynamicList.map((dynamicInfo, index) => <DynamicItem {...dynamicInfo} key={index}/>)
                }
            </Section>
        </Page>
    );
}

export default Dynamic;
