import { sheets, type SheetItem } from "@nocp/shared";

export function getSheet(src: string): SheetItem | null {
  for(const item of sheets) {
    if(item.src === src) {
      return item;
    }
  }
  return null;
}
