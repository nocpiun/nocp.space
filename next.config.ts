import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js"
      },
      "*.abc": {
        loaders: ["raw-loader"],
        as: "*.js"
      },
      "*.txt": {
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
    config.module.rules.push({
      test: /\.txt$/,
      loader: "raw-loader"
    });

    return config;
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
