import React, { useState, useEffect } from "react";

import NavbarButton from "@/components/NavbarButton";

import { getElemById } from "@/utils";

const Navbar: React.FC = () => {
    const [bgVisible, setBgVisible] = useState<boolean>(false);

    useEffect(() => {
        const pageElem = getElemById("page");
        pageElem.addEventListener("scroll", () => {
            setBgVisible(pageElem.scrollTop >= 100);
        });
    }, []);

    return (
        <nav className={"w-[100vw] h-14 pl-96 pr-96 fixed flex justify-between"} data-bg-visible={bgVisible}>
            <div className="flex space-x-9">
                <NavbarButton text="Nriot's Website" linkTo="/"/>
                <NavbarButton text="百宝箱" linkTo="/"/>
                <NavbarButton text="打赏" linkTo="/"/>
            </div>

            <div className="flex space-x-9">
                <NavbarButton text="Blog" linkTo="/"/>
                <NavbarButton text="Github" linkTo="https://github.com/NriotHrreion"/>
            </div>
        </nav>
    );
}

export default Navbar;
