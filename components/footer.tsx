import Link from "next/link";

import NetlifyLogo from "@/assets/images/netlify.png";

export function Footer() {
  return (
    <footer className="py-20 text-sm text-center space-y-2">
      <p>Designed & Maintained by Norcleeh</p>
      <p>Copyright (c) NriotHrreion {new Date().getFullYear()}</p>
      <p className="space-x-6">
        <Link href="https://netlify.com">
          <img
            className="w-5 h-5 inline-block mr-2"
            src={NetlifyLogo.src}
            alt="netlify"/>
          Netlify
        </Link>
        <Link href="https://github.com/nocpiun/nocp.space">Source Code</Link>
      </p>
    </footer>
  );
}
