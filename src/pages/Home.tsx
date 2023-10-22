import React from "react";

import Header from "@/components/Header";

import styles from "./home.module.less";

const Home: React.FC = () => {
    return (
        <div className={"flex-1 flex flex-col overflow-y-auto "+ styles["page-content"]}>
            <Header />

            <div className="">
                {/* Contents */}
            </div>
        </div>
    );
}

export default Home;
