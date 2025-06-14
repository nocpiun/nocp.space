"use client";

import React, { useMemo } from "react";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";

export function CodeBlock({ children }: {
	children: React.ReactElement
}) {
	const childProps = children.props as React.ComponentProps<"code"> & React.PropsWithChildren;
	const lang = useMemo(() => {
		return childProps.className?.replace("lang-", "");
	}, [childProps]);
	const content = useMemo(() => {
		return childProps.children;
	}, [childProps]);

	const handleCopy = async () => {
		try {
			await window.navigator.clipboard.writeText(content as string);
			alert("复制成功");
		} catch (e) {
			alert("复制失败 "+ e);
		}
	};

	return (
		<pre className="relative">
			<Button
				className="absolute top-0 right-0 cursor-pointer"
				variant="ghost"
				size="icon"
				title="复制代码"
				onClick={() => handleCopy()}>
				<Copy />
			</Button>
			<span className="absolute bottom-0 right-0 pb-2 pr-3 text-secondary-foreground text-sm">{lang}</span>

			<code className={`lang-${lang} hljs`}>{content}</code>
		</pre>
	);
}
