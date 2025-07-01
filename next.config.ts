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
  },
  turbopack: {
    rules: {
      "*.abc": {
        loaders: ["raw-loader"],
        as: "*.js"
      }
    }
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.abc$/,
      loader: "raw-loader"
    });

    return config;
  }
};

export default nextConfig;
