import Link from "next/link";
import { Award, ShieldCheck, TramFront } from "lucide-react";

import NetlifyLogo from "@/assets/images/netlify.png";

export function Footer() {
  return (
    <footer className="py-20 text-sm text-center space-y-2">
      <p>Designed & Maintained by Norcleeh</p>
      <p>Copyright (c) NriotHrreion {new Date().getFullYear()}</p>
      <p className="space-x-6">
        <Link href="https://github.com/nocpiun/nocp.space">Source Code</Link>
        <Link
          href="https://netlify.com"
          title="本站部署于Netlify"
          target="_blank">
          <img
            className="w-5 h-5 inline-block mr-2"
            src={NetlifyLogo.src}
            alt="netlify"/>
          Netlify
        </Link>
        <Link
          className="space-x-1"
          href="https://ipw.cn/ipv6webcheck/?site=nocp.space"
          title="本站支持IPv6访问"
          target="_blank">
          <Award className="inline-block align-middle stroke-theme-foreground" size={18}/>
          <span>IPv6</span>
        </Link>
        <Link
          className="space-x-1"
          href="https://ipw.cn/ssl/?site=nocp.space"
          title="本站支持SSL安全访问"
          target="_blank">
          <ShieldCheck className="inline-block align-middle stroke-theme-foreground" size={18}/>
          <span>SSL</span>
        </Link>
      </p>
      <p>
        <Link
          className="space-x-1 text-purple-700 dark:text-purple-400"
          href="https://travellings.cn/go.html"
          title="开往..."
          target="_blank">
          <TramFront className="inline-block align-middle stroke-purple-700 dark:stroke-purple-400" size={18}/>
          <span>Travelling</span>
        </Link>
      </p>
    </footer>
  );
}
