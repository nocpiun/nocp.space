import type { SheetItem } from "@nocp/shared";
import sheets from "@/data/sheets/sheets.json";

export function getSheet(src: string): SheetItem | null {
  for(const item of sheets) {
    if(item.src === src) {
      return item;
    }
  }
  return null;
}
