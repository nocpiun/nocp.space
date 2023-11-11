import React, { useState, useEffect } from "react";

import NavbarButton from "@/components/NavbarButton";

const Navbar: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(true);
    const clientWidth = document.body.clientWidth;

    useEffect(() => {
        document.body.addEventListener("wheel", (e) => setVisible(e.deltaY < 0));
    }, []);

    return (
        <nav
            className="w-[100vw] h-14 pl-[20vw] pr-[20vw] max-lg:pl-[5vw] max-lg:pr-[5vw] max-sm:pl-[20px] max-sm:pr-[20px] z-50 fixed bg-gradient-to-b from-[--nocp-bg] to-transparent transition-all ease-out duration-[250ms] overflow-hidden flex justify-between"
            style={{ transform: visible ? "translateY(0)" : "translateY(-3.5rem)" }}>
            <div className="flex space-x-9 max-sm:space-x-5">
                <NavbarButton text={clientWidth > 768 ? "Noah's Website" : "主页"} linkTo="/"/>
                <NavbarButton text="百宝箱" linkTo="/treasure-chest"/>
                <NavbarButton text="友链" linkTo="/links"/>
                <NavbarButton text="打赏" linkTo="/donate"/>
            </div>

            <div className="flex space-x-9 max-sm:space-x-5">
                <NavbarButton text="Blog" linkTo="/blog"/>
                <NavbarButton text="Github" linkTo="https://github.com/NriotHrreion" className="max-sm:hidden"/>
            </div>
        </nav>
    );
}

export default Navbar;
