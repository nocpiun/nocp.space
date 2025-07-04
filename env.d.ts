declare module "highlightjs-abc" {
  import type { Language } from "highlight.js";

  const hljsAbc: () => Language;
  export default hljsAbc;
}
