"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, TramFront } from "lucide-react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList
} from "./ui/navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import { githubAccount, siteName } from "@/lib/global";
import { emitter } from "@/lib/emitter";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface NavbarItem {
	name: string
	url: string
	external?: boolean
}

const leftList: NavbarItem[] = [
	{ name: siteName, url: "/" },
	{ name: "曲谱", url: "/sheets" },
	{ name: "友链", url: "/links" },
	{ name: "打赏", url: "/donate" },
];

const rightList: NavbarItem[] = [
	{ name: "Blog", url: "/blog" },
	{ name: "Github", url: githubAccount, external: true },
];

export function Navbar() {
	const [visible, setVisible] = useState(true);
	const [overBanner, setOverBanner] = useState(false);

	useEffect(() => {
		document.body.addEventListener("wheel", (e) => setVisible(e.deltaY < 0));
	}, []);

	useEffect(() => {
		const handler = (value: boolean) => setOverBanner(value);
		emitter.on("nav-over-banner", handler);
		return () => { emitter.off("nav-over-banner", handler); };
	}, []);

	return (
		<NavigationMenu
			data-over-banner={overBanner || undefined}
			className={cn(
				"z-20 nav-padding w-full max-w-none py-5 flex justify-between fixed",
				"bg-gradient-to-b to-transparent transition-all ease-out duration-[250ms] overflow-hidden",
				"from-background",
				"data-[over-banner]:from-foreground dark:data-[over-banner]:from-background",
				"data-[over-banner]:text-white dark:data-[over-banner]:text-foreground"
			)}
			style={{ transform: visible ? "translateY(0)" : "translateY(-3.5rem)" }}>
			<NavigationMenuList className="max-sm:gap-0 text-nowrap">
				{leftList.map(({ name, url }, i) => (
					<NavigationMenuItem key={i}>
						<NavigationMenuLink asChild>
							<Link href={url}>{name}</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>

			<div className="flex gap-1 items-center max-sm:hidden">
				<NavigationMenuList>
					{rightList.map(({ name, url, external }, i) => (
						<NavigationMenuItem key={i}>
							<NavigationMenuLink asChild>
								<Link href={url} target={external ? "_blank" : "_self"}>
									{name}
									{external && <ExternalLink />}
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>

				<ThemeToggle />

				{/* Travelling */}
				<Button
					variant="ghost"
					size="icon"
					title="开往..."
					asChild>
					<Link
						href="https://www.travellings.cn/go.html"
						target="_blank">
						<TramFront />
					</Link>
				</Button>
			</div>
		</NavigationMenu>
	);
}
