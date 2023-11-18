import React from "react";

import Link from "@/components/Link";

import AvatarImg from "@/static/avatar.jpg";

const Header: React.FC = () => {
    return (
        <header className="h-auto pl-10 pr-10 pt-52 pb-16 flex max-md:flex-col max-md:space-y-9">
            <div className="flex-1">
                <h1 className="text-8xl text-right relative max-md:text-center">
                    <span className="font-[FiraCode-SemiBold]">Hello</span>
                </h1>
                <p className="text-4xl text-right max-md:text-center pt-4">I'm NoahHrreion</p>
            </div>
            <div className="flex-[1.5] pl-20 space-y-5 max-md:text-center max-md:pl-0">
                <img className="mb-7 rounded-full max-md:ml-auto max-md:mr-auto max-md:mb-9" src={AvatarImg} alt="avatar"/>

                <p className="text-lg">👋 我是一个热爱网页开发、音乐和Minecraft的高中生, 很高兴能见到你！</p>

                <p className="text-lg">关注我 :)</p>
                <ol>
                    <li>Github: <Link to="https://github.com/NriotHrreion" newTab>NoahHrreion</Link></li>
                    <li>BiliBili: <Link to="https://space.bilibili.com/167995410" newTab>NoahHrreion</Link></li>
                    <li>X: <Link to="https://twitter.com/Nriot_McPack" newTab>@Nriot_McPack</Link></li>
                </ol>
            </div>
        </header>
    );
}

export default Header;
