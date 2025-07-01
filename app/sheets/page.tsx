import Link from "next/link";
import { Page } from "@/components/page";
import { SheetsTable } from "./sheets-table";

export default function Sheets() {
  return (
    <Page title="曲谱">
      <p>作为一个音乐爱好者，我偶尔会用吉他扒一些网上找不到的谱。下面是我所扒出的曲谱，若有纰漏之处，欢迎指正。</p>
      <p>曲谱排版与渲染使用了<Link href="https://abcjs.net" target="_blank">abc.js</Link>库，出于某些原因，TAB谱的部分指法可能有误，可以参考五线谱自行调整。</p>

      <SheetsTable />
    </Page>
  );
}
