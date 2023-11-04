import { createBrowserRouter } from "react-router-dom";

// Pages
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import TreasureChest from "@/pages/TreasureChest";
import Donate from "@/pages/Donate";
import BlogOverview from "@/pages/BlogOverview";
import BlogArticle from "@/pages/BlogArticle";

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
        path: "/404",
        element: <NotFound />
    },
    {
        path: "*",
        element: <NotFound />
    }
]);
