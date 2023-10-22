import { createBrowserRouter } from "react-router-dom";

// Pages
import Home from "@/pages/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }
]);
