"use client";

import { useEffect, useRef } from "react";
import { Gitalk } from "@aifire/gitalk";

export function GitalkComments({
  issue
}: {
  issue: number
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!containerRef.current) return;

    const gitalk = new Gitalk({
      clientID: process.env.NEXT_PUBLIC_GITALK_CLIENT_ID ?? "",
      proxy: "/api/gitalk",
      backend: "issues",
      repo: "nocp.space-comments",
      owner: "NriotHrreion",
      admin: ["NriotHrreion"],
      number: issue
    });
    gitalk.render(containerRef.current);

    return () => gitalk.destroy();
  }, [issue]);

  return <div ref={containerRef}/>;
}
