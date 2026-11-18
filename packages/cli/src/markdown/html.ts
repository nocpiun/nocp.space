const htmlEntityMap: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: "\"",
  apos: "'",
  "#39": "'",
};

export function decodeHtmlEntities(text: string): string {
  return text.replace(/&(nbsp|amp|lt|gt|quot|apos|#39|#(\d+)|#x([0-9a-f]+));/gi, (full, name: string, dec?: string, hex?: string) => {
    if(dec) return String.fromCodePoint(Number.parseInt(dec, 10));
    if(hex) return String.fromCodePoint(Number.parseInt(hex, 16));
    return htmlEntityMap[name.toLowerCase()] ?? full;
  });
}

export function stripInlineHtml(html: string): string {
  const withoutComments = html.replace(/<!--[\s\S]*?-->/g, "");
  return decodeHtmlEntities(withoutComments.replace(/<[^>]+>/g, ""));
}

export function htmlToPlainLines(html: string): string[] {
  return decodeHtmlEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(?:p|div|li|tr|h[1-6]|blockquote|section|article|summary|figcaption)>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .split("\n")
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}
