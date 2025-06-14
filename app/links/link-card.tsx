"use client";

import Image from "next/image";
import {
  Card,
  CardDescription,
  CardTitle
} from "@/components/ui/card";
import type { ArrayElement } from "@/lib/utils";
import type links from "@/data/info/links.json";
import { Button } from "@/components/ui/button";

export function LinkCard({
  name,
  description,
  url,
  avatar
}: ArrayElement<typeof links>) {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <Card
      className="h-28 p-0 flex flex-row gap-0 overflow-hidden rounded-md group cursor-pointer"
      title={url}
      onClick={() => handleClick()}>
      <Image src={avatar} alt={name} width={112} height={112}/>
      <div className="p-5 flex flex-col justify-between">
        <CardTitle>
          <Button className="text-xl p-0 font-semibold cursor-pointer group-hover:underline" variant="link">
            {name}
          </Button>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </Card>
  );
}
