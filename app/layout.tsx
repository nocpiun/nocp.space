import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "katex/dist/katex";
import "katex/contrib/auto-render";
import "katex/contrib/mhchem";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { siteName, siteDescription } from "@/lib/global";
import { cn } from "@/lib/utils";

import "./globals.css";
import "katex/dist/katex.min.css";

const firaCode = localFont({
  src: [{ path: "../assets/fonts/FiraCode-VariableFont_wght.ttf", style: "normal" }],
});

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
  authors: [{ name: "NriotHrreion", url: "https://nocp.space" }],
  keywords: ["Nriot", "Norcleeh", "NriotHrreion", "NoahHrreion", "个人网站", "博客", "NBlog"],
  icons: "/static/icon.png"
};

export const viewport: Viewport = {
  themeColor: "#000000"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-cn" suppressHydrationWarning>
      <body className={cn(firaCode.className, "antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Script src="https://unpkg.com/nriot-utils@latest/dist/index.js"/>
      </body>
    </html>
  );
}
