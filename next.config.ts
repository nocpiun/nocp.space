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
        hostname: "blog.liuzhen932.top",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "blog.byteloid.one",
        port: "",
        pathname: "/img/**"
      },
      {
        protocol: "https",
        hostname: "thirdqq.qlogo.cn",
        port: "",
        pathname: "/g"
      },
      {
        protocol: "https",
        hostname: "ttio.cc",
        port: "",
        pathname: "/**"
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
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
};

export default nextConfig;
