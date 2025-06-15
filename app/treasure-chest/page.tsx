import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { githubAccount } from "@/lib/global";

import treasureChest from "@/data/info/treasure-chest.json";

export default function TreasureChest() {
  return (
    <Page title="百宝箱">
      <p>在这个百宝箱中，有我制作的小工具和小游戏，以及我整的各种有意思的东西。</p>
      <p>如果你感兴趣的话，可以在我的<Link href={githubAccount} target="_blank">Github</Link>中找到源码。</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名称</TableHead>
            <TableHead className="text-center">链接</TableHead>
            <TableHead>简介</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {treasureChest.map(({ name, url, description }, i) => (
            <TableRow key={i}>
              <TableCell className="font-semibold">{name}</TableCell>
              <TableCell>
                <Button
                  className="w-full h-5 text-center"
                  variant="link"
                  size="sm"
                  asChild>
                  <Link href={url} target="_blank">查看</Link>
                </Button>
              </TableCell>
              <TableCell className="font-light">{description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Page>
  );
}
