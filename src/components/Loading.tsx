import React, { useEffect } from "react";
import NProgress from "nprogress";

import "nprogress/nprogress.css";

NProgress.configure({
    showSpinner: false,
    speed: 500
});

const Loading: React.FC = () => {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    }, []);

    return <></>;
}

export default Loading;
