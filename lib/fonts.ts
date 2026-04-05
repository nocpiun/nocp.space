import localFont from "next/font/local";

export const firaCode = localFont({
  src: [{ path: "../assets/fonts/FiraCode-VariableFont_wght.ttf", style: "normal" }],
});

export const googleSansCode = localFont({
  src: [
    { path: "../assets/fonts/GoogleSansCode-VariableFont_wght.ttf", style: "normal" },
    { path: "../assets/fonts/GoogleSansCode-Italic-VariableFont_wght.ttf", style: "italic" }
  ]
});

export const robotoSlab = localFont({
  src: [
    { path: "../assets/fonts/RobotoSlab-VariableFont_wght.ttf", style: "normal" }
  ]
});
