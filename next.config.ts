import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // three.js 사용 시 필요할 수 있음
    return config;
  },
};

export default nextConfig;
