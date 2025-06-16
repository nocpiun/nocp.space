import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { siteName, siteDescription, siteKeywords } from "@/lib/global";
import { cn } from "@/lib/utils";

import "gitalk/dist/gitalk.css";
import "./globals.css";
import "./gitalk.css";

const firaCode = localFont({
  src: [{ path: "../assets/fonts/FiraCode-VariableFont_wght.ttf", style: "normal" }],
});

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
  authors: [{ name: "NriotHrreion", url: "https://nocp.space" }],
  keywords: siteKeywords,
  icons: "/static/icon.png"
};

export const viewport: Viewport = {
  themeColor: "#077955"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-cn" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4ZYGQ03SMX"/>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4ZYGQ03SMX');
          `}
        </Script>
        {/* Baidu Analytics */}
        <Script id="baidu-analytics">
          {`
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?620b212e2ea7f19ef49f3276fb1f286e";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `}
        </Script>
      </head>
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
