import localFont from "next/font/local";

export const notoSansSC = localFont({
  src: [
    { path: "../assets/fonts/NotoSansSC-VariableFont_wght.ttf", style: "normal" }
  ],
  variable: "--noto-sans"
});

export const notoSerifSC = localFont({
  src: [
    { path: "../assets/fonts/NotoSerifSC-VariableFont_wght.ttf", style: "normal" }
  ],
  variable: "--noto-serif"
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
