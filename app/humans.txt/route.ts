import { NextResponse } from "next/server";
import template from "./humans.template.txt";

export const dynamic = "force-static";

export function GET() {
  const date = new Date();
  const content = template
    .replace("{0}", `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
