import { Page } from "@/components/page";
import { SheetsTable } from "./sheets-table";

export default function Sheets() {
  return (
    <Page title="曲谱">
      <p>作为一个音乐爱好者，我偶尔会用吉他扒一些网上找不到的谱。下面是我所扒出的曲谱，若有纰漏之处，欢迎指正。</p>

      <SheetsTable />
    </Page>
  );
}
