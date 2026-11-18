import sheets from "@/data/sheets/sheets.json";
import { cliJson } from "../serialize";

export const dynamic = "force-static";

export function GET() {
  return cliJson(sheets);
}
