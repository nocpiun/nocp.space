/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useMemo } from "react";

import Emitter from "@/utils/Emitter";
import { getRandom } from "@/utils";

const contents = [
    `Hey there, welcome to nin.red!`,
    `Bingo!`,
    `Calcium is a calculator.`,
    `Congratulations! You found the easter.`,
    `Why is six so nervous? Because seven eight nine.`,
];

const Easter: React.FC = () => {
    const content = useMemo(() => contents[getRandom(0, contents.length - 1)], []);
    const [isActivated, setActivated] = useState<boolean>(false);
    const [cursorBlink, setBlink] = useState<boolean>(true);
    const containerRef = useRef<HTMLPreElement | null>(null);
    const contentRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        Emitter.get().once("easter", () => {
            setActivated(true);

            // Displaying animation
            setTimeout(() => {
                if(!containerRef.current) return;

                containerRef.current.style.height = "100px";
            }, 100);

            // Display easter content
            var contentTimer = setInterval(() => {
                if(!contentRef.current) return;
                const current = contentRef.current.innerText;
    
                if(current === content) {
                    clearInterval(contentTimer);
                    return;
                }
    
                contentRef.current.innerText += content[current.length];
            }, 100);

            // Cursor blinking
            setInterval(() => {
                setBlink((current) => !current);
            }, 500);
        });

        return () => {
            Emitter.get().removeAllListeners("easter");
        };
    }, []);

    return (
        <div>
            {isActivated && (
                <pre className="w-[35vw] max-lg:w-[60vw] max-sm:w-[70vw] h-0 transition-all duration-700 text-[--nocp-forebg] ml-auto mr-auto" ref={containerRef}>
                    <code className="block w-full pt-2 pb-2 pl-3 pr-3">
                        <span ref={contentRef}/>
                        <div className={"w-2 h-4 inline-block align-text-top ml-[2px] "+ (cursorBlink ? "bg-[--nocp-forebg]" : "")}/>
                    </code>
                </pre>
            )}
        </div>
    );
}

export default Easter;
