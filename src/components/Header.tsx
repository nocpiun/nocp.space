import React from "react";

import Link from "@/components/Link";

const Header: React.FC = () => {
    return (
        <header className="h-96 pl-10 pr-10 pt-40 pb-16 flex">
            <div className="flex-1 flex flex-col justify-between">
                <h1 className="text-8xl font-[FiraCode-SemiBold] text-right">Hello</h1>
                <p className="text-4xl text-right">I'm NoahHrreion</p>
            </div>
            <div className="flex-[1.5] pl-20">
                <p className="text-lg">👋 我是一个热爱网页开发、音乐和Minecraft的高中生, 很高兴能见到你！</p>

                <p className="text-lg mt-5">关注我 :)</p>
                <p className="mt-3">
                    <ol className=" list-disc">
                        <li>Github: <Link to="https://github.com/NriotHrreion" newTab>NoahHrreion</Link></li>
                        <li>BiliBili: <Link to="https://space.bilibili.com/167995410" newTab>NoahHrreion</Link></li>
                        <li>X: <Link to="https://twitter.com/Nriot_McPack" newTab>@Nriot_McPack</Link></li>
                    </ol>
                </p>
            </div>
        </header>
    );
}

export default Header;
