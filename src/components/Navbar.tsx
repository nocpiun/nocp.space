import React, { useState, useEffect } from "react";

import NavbarButton from "@/components/NavbarButton";

const Navbar: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        document.body.addEventListener("wheel", (e) => setVisible(e.deltaY < 0));
    }, []);

    return (
        <nav
            className="w-[100vw] h-14 pl-96 pr-96 z-50 fixed bg-gradient-to-b from-[--nocp-bg] to-transparent transition-all ease-out duration-[250ms] overflow-hidden flex justify-between"
            style={{ transform: visible ? "translateY(0)" : "translateY(-3.5rem)" }}>
            <div className="flex space-x-9">
                <NavbarButton text="Noah's Website" linkTo="/"/>
                <NavbarButton text="百宝箱" linkTo="/treasure-chest"/>
                <NavbarButton text="打赏" linkTo="/donate"/>
            </div>

            <div className="flex space-x-9">
                <NavbarButton text="Blog" linkTo="/blog"/>
                <NavbarButton text="Github" linkTo="https://github.com/NriotHrreion"/>
            </div>
        </nav>
    );
}

export default Navbar;
