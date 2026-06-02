"use client";

import { useEffect } from "react";

import { emitter } from "@/lib/emitter";

const NAV_HEIGHT = 56;

export function BlogNavWatcher() {
  useEffect(() => {
    const banner = document.querySelector<HTMLElement>("[data-blog-banner]");
    if(!banner) return;

    const update = () => {
      emitter.emit("nav-over-banner", banner.getBoundingClientRect().bottom > NAV_HEIGHT);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      emitter.emit("nav-over-banner", false);
    };
  }, []);

  return null;
}
