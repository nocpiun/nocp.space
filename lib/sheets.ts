import type { ArrayElement } from "./utils";

import sheets from "@/data/sheets/sheets.json";

export function getSheet(src: string): ArrayElement<typeof sheets> | null {
  for(const item of sheets) {
    if(item.src === src) {
      return item;
    }
  }
  return null;
}
