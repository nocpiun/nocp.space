/// <reference types="vinext/types" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "highlightjs-abc" {
  import type { Language } from "highlight.js";

  const hljsAbc: () => Language;
  export default hljsAbc;
}

declare module "*.txt" {
  const content: string;
  export default content;
}
