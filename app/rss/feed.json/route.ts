import { NextResponse } from "next/server";
import { json } from "@/lib/rss";

export async function GET() {
  return new NextResponse(json, {
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });
}
