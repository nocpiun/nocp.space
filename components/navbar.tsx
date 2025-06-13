"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList
} from "./ui/navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import { githubAccount, siteName } from "@/lib/global";

interface NavbarItem {
	name: string
	url: string
	external?: boolean
}

const leftList: NavbarItem[] = [
	{ name: siteName, url: "/" },
	{ name: "百宝箱", url: "/treasure-chest" },
	{ name: "友链", url: "/links" },
	{ name: "打赏", url: "/donate" },
];

const rightList: NavbarItem[] = [
	{ name: "Blog", url: "/blog" },
	{ name: "Github", url: githubAccount, external: true },
];

export function Navbar() {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		document.body.addEventListener("wheel", (e) => setVisible(e.deltaY < 0));
	}, []);
	
	return (
		<NavigationMenu
			className="z-10 nav-padding w-full max-w-none py-5 flex justify-between fixed bg-gradient-to-b from-[var(--background)] to-transparent transition-all ease-out duration-[250ms] overflow-hidden"
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

			<div className="flex gap-3 items-center max-sm:hidden">
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
			</div>
		</NavigationMenu>
	);
}
