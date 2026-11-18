"use client";

import {
  Card,
  CardDescription,
  CardTitle
} from "@/components/ui/card";
import type { FriendLink } from "@nocp/shared";
import { Button } from "@/components/ui/button";

export function LinkCard({
  name,
  description,
  url,
  avatar
}: FriendLink) {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <Card
      className="h-28 p-0 flex flex-row gap-0 overflow-hidden rounded-md group cursor-pointer"
      title={url}
      onClick={() => handleClick()}>
      <img src={avatar} alt={name} width={112} height={112} className="object-cover"/>
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
