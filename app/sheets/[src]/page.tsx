import type { Metadata } from "next";
import { blogName, siteKeywords } from "@/lib/global";
import { getSheet } from "@/lib/sheets";
import { AbcSheet } from "@/components/abc-sheet";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ src: string }>
}): Promise<Metadata> {
  const { src } = await params;
  const sheet = getSheet(src);

  if(!sheet) return {};

  return {
    title: `${blogName} - ${sheet.name}`,
    keywords: [...siteKeywords, sheet.name, sheet.author, "吉他", "吉他谱", "曲谱", "扒谱"],
  };
}

export default async function Sheet({
  params,
}: {
  params: Promise<{ src: string }>
}) {
  const { src } = await params;
  const sheet = getSheet(src);
  const { default: content } = await import(`@/data/sheets/${src}.abc`);

  if(!sheet) return <></>;

  return (
    <div className="page-padding pt-24 flex flex-col gap-10">
      <div className="mt-6 flex flex-col gap-12">
        <h1 className="text-4xl font-bold">{sheet.name}</h1>
        <div className="space-x-6">
          <span className="text-secondary-foreground">作曲 {sheet.author}</span>
          <span>
            <span className="text-green-600">{sheet.tune}</span>
            &nbsp;调
          </span>
          <span>
            变调夹&nbsp;
            <span className="text-yellow-600">{sheet.capo}</span>
            &nbsp;品
          </span>
        </div>
      </div>
      <AbcSheet
        sheet={content}
        capo={sheet.capo}/>
    </div>
  );
}
