import Link from "next/link";
import { TramFront } from "lucide-react";
import { Page } from "@/components/page";
import { siteName, siteDescription } from "@/lib/global";
import { LinkCard } from "./link-card";
import { GitalkComments } from "@/components/gitalk-comments";
import { Button } from "@/components/ui/button";

import links from "@/data/info/links.json";

export default function Links() {
  return (
    <Page title="友情链接">
      <p>如果你也想与我交换友链，敬请在下方留言，附上你的网站信息，我会不定时查看更新的😉</p>

      <div className="grid grid-cols-2 gap-5 mb-10 max-xl:grid-cols-1">
        {links.map((item, i) => <LinkCard {...item} key={i}/>)}
      </div>

      <h3 className="text-2xl font-semibold">本站信息</h3>
      <div className="space-y-2">
        <p><b>名称</b>：<code>{siteName}</code></p>
        <p><b>简介</b>：{siteDescription}</p>
        <p><b>URL</b>：<Link href="/">https://nocp.space</Link></p>
        <p><b>图标</b>：<Link href="https://nocp.space/static/icon.png">https://nocp.space/static/icon.png</Link></p>
        <p><b>颜色</b>：<span className="bg-theme text-white">#077955</span></p>
      </div>

      <h3 className="text-2xl font-semibold">开往</h3>
      <p>本站已加入<Link href="https://travellings.cn" target="_blank">开往项目</Link>。</p>
      <Button asChild>
        <Link
          className="hover:no-underline"
          href="https://www.travellings.cn/go.html"
          target="_blank">
          <TramFront />
          Travelling 开往...
        </Link>
      </Button>

      <GitalkComments issue={3}/>
    </Page>
  );
}
