"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { googleSansCode } from "@/lib/fonts";

export function CodeBlock({ children }: {
	children: React.ReactElement
}) {
	const childProps = children.props as React.ComponentProps<"code"> & React.PropsWithChildren;
	const lang = childProps.className?.replace("lang-", "");
	const content = childProps.children;
	const [icon, setIcon] = useState(<Copy />);

	const handleCopy = async () => {
		try {
			await window.navigator.clipboard.writeText(content as string);
			setIcon(<Check />);
			setTimeout(() => setIcon(<Copy />), 2000);
		} catch (e) {
			alert("复制失败 "+ e);
		}
	};

	return (
		<pre className="relative group/code-block">
			<Button
				className="absolute top-0 right-0 cursor-pointer bg-transparent! text-muted-foreground opacity-0 group-hover/code-block:opacity-100 duration-100"
				variant="ghost"
				size="icon"
				title="复制代码"
				onClick={() => handleCopy()}>
				{icon}
			</Button>
			<span className={cn("absolute bottom-0 right-0 pb-2 pr-3 text-secondary-foreground text-xs font-light", googleSansCode.className)}>{lang}</span>

			<code className={`lang-${lang} hljs`}>{content}</code>
		</pre>
	);
}
