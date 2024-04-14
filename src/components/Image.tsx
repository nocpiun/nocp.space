import React, { PropsWithChildren, useEffect, useRef } from "react";
import mediumZoom from "medium-zoom";

interface ImageProps extends PropsWithChildren {
    title: string
    alt: string
    src: string
}

// overrides markdown-to-jsx
const Image: React.FC<ImageProps> = (props) => {
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if(!imageRef.current) return;

        mediumZoom(imageRef.current, {
            background: "#19191a"
        });
    }, []);

    return <img src={props.src} alt={props.alt} ref={imageRef}/>;
}

export default Image;
