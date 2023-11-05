import { createBrowserRouter } from "react-router-dom";

// Pages
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import TreasureChest from "@/pages/TreasureChest";
import Links from "@/pages/Links";
import Donate from "@/pages/Donate";
import BlogOverview from "@/pages/BlogOverview";
import BlogArticle from "@/pages/BlogArticle";
import BlogTags from "@/pages/BlogTags";
import BlogTag from "@/pages/BlogTag";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/treasure-chest",
        element: <TreasureChest />
    },
    {
        path: "/links",
        element: <Links />
    },
    {
        path: "/donate",
        element: <Donate />
    },
    {
        path: "/blog",
        element: <BlogOverview />
    },
    {
        path: "/blog/:title",
        element: <BlogArticle />
    },
    {
        path: "/tags",
        element: <BlogTags />
    },
    {
        path: "/tags/:tagName",
        element: <BlogTag />
    },
    {
        path: "/404",
        element: <NotFound />
    },
    {
        path: "*",
        element: <NotFound />
    }
]);
