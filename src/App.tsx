import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";

import "@/style/style.less";
import "highlight.js/styles/github-dark.min.css";

// Pages
const NotFound = lazy(() => import("@/pages/NotFound"));
const Home = lazy(() => import("@/pages/Home"));
const TreasureChest = lazy(() => import("@/pages/TreasureChest"));
const Links = lazy(() => import("@/pages/Links"));
const Donate = lazy(() => import("@/pages/Donate"));
const BlogOverview = lazy(() => import("@/pages/BlogOverview"));
const BlogArticle = lazy(() => import("@/pages/BlogArticle"));
const BlogTags = lazy(() => import("@/pages/BlogTags"));
const BlogTag = lazy(() => import("@/pages/BlogTag"));

const App: React.FC = () => {
    return (
        <div className="w-[100vw] h-[100vh] bg-[--nocp-bg]">
            <Router>
                <Navbar />

                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}/>
                        <Route
                            path="/treasure-chest"
                            element={<TreasureChest />}/>
                        <Route
                            path="/links"
                            element={<Links />}/>
                        <Route
                            path="/donate"
                            element={<Donate />}/>
                        <Route
                            path="/blog"
                            element={<BlogOverview />}/>
                        <Route
                            path="/blog/:title"
                            element={<BlogArticle />}/>
                        <Route
                            path="/tags"
                            element={<BlogTags />}/>
                        <Route
                            path="/tags/:tagName"
                            element={<BlogTag />}/>
                        <Route
                            path="/404"
                            element={<NotFound />}/>
                        <Route
                            path="*"
                            element={<NotFound />}/>
                    </Routes>
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
