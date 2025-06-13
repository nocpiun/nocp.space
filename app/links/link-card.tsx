import Image from "next/image";
import {
  Card,
  CardDescription,
  CardTitle
} from "@/components/ui/card";
import type { ArrayElement } from "@/lib/utils";
import type links from "@/data/info/links.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LinkCard({
  name,
  description,
  url,
  avatar
}: ArrayElement<typeof links>) {
  return (
    <Card className="h-28 p-0 flex flex-row gap-0 overflow-hidden rounded-md">
      <Image src={avatar} alt={name} width={112} height={112}/>
      <div className="p-5 flex flex-col justify-between">
        <CardTitle>
          <Button className="text-xl p-0 font-semibold" variant="link" asChild>
            <Link href={url} target="_blank">{name}</Link>
          </Button>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </Card>
  );
}
