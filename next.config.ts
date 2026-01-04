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
      },
      {
        protocol: "https",
        hostname: "772123.xyz",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "smite.work",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "casear.net",
        port: "",
        pathname: "/static/img/**"
      },
      {
        protocol: "https",
        hostname: "opanel.cn",
        port: "",
        pathname: "/static/**"
      },
      {
        protocol: "https",
        hostname: "q1.qlogo.cn",
        port: "",
        pathname: "/g"
      },
      {
        protocol: "https",
        hostname: "henlo.cc",
        port: "",
        pathname: "/static/**"
      },
      {
        protocol: "https",
        hostname: "vnyzm.top",
        port: "",
        pathname: "/img/**"
      }
    ]
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js"
      },
      "*.abc": {
        loaders: ["raw-loader"],
        as: "*.js"
      }
    }
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      loader: "@svgr/webpack",
    });
    config.module.rules.push({
      test: /\.abc$/,
      loader: "raw-loader"
    });

    return config;
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
