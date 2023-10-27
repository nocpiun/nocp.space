import React from "react";
import { RouterProvider } from "react-router-dom";

import Navbar from "@/components/Navbar";

import { router } from "@/router";

import "@/style/style.less";

const App: React.FC = () => {
    return (
        <div className="w-[100vw] h-[100vh] bg-[--nocp-bg]">
            <Navbar />
            
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
