import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**"
      },
      {
        protocol: "https",
        hostname: "serinanya.cn",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "yunyoujun.cn",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "blog.byteloid.one",
        port: "",
        pathname: "/img/**"
      }
    ]
  }
};

export default nextConfig;
