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

    return (
        <div className="text-center">
            <img className="mt-6 mb-2 ml-auto mr-auto" src={props.src} alt={props.alt} ref={imageRef}/>
            <span className="text-sm text-[--nocp-light-gray]">{props.alt}</span>
        </div>
    );
}

export default Image;
