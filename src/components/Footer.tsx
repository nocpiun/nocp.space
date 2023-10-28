import React from "react";

import Link from "@/components/Link";

import NetlifyLogo from "@/static/netlify.png";

const Footer: React.FC = () => {
    return (
        <footer className="h-56 pt-20 pb-16 pl-96 pr-96 space-y-2 text-center text-sm">
            <p>Designed & Maintained by NoahHrreion</p>
            <p>Copyright (c) NriotHrreion {new Date().getFullYear()}</p>
            <p className="space-x-6">
                <Link to="https://netlify.app" newTab icon={NetlifyLogo}>Netlify</Link>
                <Link to="https://github.com/nocpiun/nin.red" newTab>Github Repo</Link>
            </p>
        </footer>
    );
}

export default Footer;
