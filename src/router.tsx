import { createBrowserRouter } from "react-router-dom";

// Pages
import Home from "@/pages/Home";
import TreasureChest from "@/pages/TreasureChest";
import Donate from "@/pages/Donate";

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
    }
]);
