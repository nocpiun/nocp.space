import { NextResponse } from "next/server";
import { atom } from "@/lib/rss";

export async function GET() {
  return new NextResponse(atom, {
    headers: {
      "Content-Type": "application/xml;charset=utf-8"
    }
  });
}
