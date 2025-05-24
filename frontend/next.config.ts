import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    config.cache = false; // 🔥 Disable webpack filesystem caching
    return config;
  },
};

export default nextConfig;
