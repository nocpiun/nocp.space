export function charWidth(ch: string): number {
  const cp = ch.codePointAt(0);
  if(cp === undefined) return 0;
  if((cp >= 0x0300 && cp <= 0x036f)
    || (cp >= 0x200b && cp <= 0x200d)
    || (cp >= 0xfe00 && cp <= 0xfe0f)) return 0;
  if((cp >= 0x1100 && cp <= 0x115f)
    || cp === 0x2329 || cp === 0x232a
    || (cp >= 0x2e80 && cp <= 0xa4cf && cp !== 0x303f)
    || (cp >= 0xac00 && cp <= 0xd7a3)
    || (cp >= 0xf900 && cp <= 0xfaff)
    || (cp >= 0xfe10 && cp <= 0xfe19)
    || (cp >= 0xfe30 && cp <= 0xfe6f)
    || (cp >= 0xff00 && cp <= 0xff60)
    || (cp >= 0xffe0 && cp <= 0xffe6)
    || (cp >= 0x1f300 && cp <= 0x1faff)
    || (cp >= 0x20000 && cp <= 0x3fffd)) return 2;
  return 1;
}

export function stringWidth(text: string): number {
  let total = 0;
  for(const ch of text) {
    total += charWidth(ch);
  }
  return total;
}

export function wrapText(text: string, maxWidth: number): string[] {
  if(maxWidth <= 0) return [""];
  if(!text) return [""];

  const lines: string[] = [];
  let current = "";
  let currentWidth = 0;

  for(const ch of text) {
    const w = charWidth(ch);
    if(currentWidth + w > maxWidth && current.length > 0) {
      lines.push(current);
      if(ch === " ") {
        current = "";
        currentWidth = 0;
        continue;
      }
      current = ch;
      currentWidth = w;
    } else {
      current += ch;
      currentWidth += w;
    }
  }

  if(current.length > 0 || lines.length === 0) {
    lines.push(current);
  }

  return lines;
}
