import React from "react";

import NavbarButton from "@/components/NavbarButton";

const Navbar: React.FC = () => {return (
        <nav className="w-[100vw] h-14 pl-96 pr-96 z-50 fixed bg-gradient-to-b from-[--nocp-bg] to-transparent flex justify-between">
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
