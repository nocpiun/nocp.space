import React, { PropsWithChildren, ReactElement, useMemo } from "react";
import { ReactSVG } from "react-svg";

import CopyIcon from "@/static/copy.svg";

interface CodeBlockProps extends PropsWithChildren {
    
}

// overrides markdown-to-jsx
const CodeBlock: React.FC<CodeBlockProps> = (props) => {
    const lang = useMemo(() => {
        return (props.children as ReactElement).props.className.replace("lang-", "");
    }, [props.children]);
    const content = useMemo(() => {
        return (props.children as ReactElement).props.children;
    }, [props.children]);

    const handleCopy = async () => {
        try {
            await window.navigator.clipboard.writeText(content);
            alert("复制成功");
        } catch (e) {
            alert("复制失败");
        }
    };

    return (
        <pre className="relative">
            <button
                className="absolute top-0 right-0 pt-2 pr-2 text-sm transition-colors hover:text-[--nocp-light-green] active:text-[--nocp-green]"
                onClick={() => handleCopy()}>
                <ReactSVG src={CopyIcon}/>
            </button>
            <span className="absolute bottom-0 right-0 pb-2 pr-3 text-[--nocp-light-gray] text-sm">{lang}</span>

            <code className={"lang-"+ lang +" hljs"}>{content}</code>
        </pre>
    );
}

export default CodeBlock;
