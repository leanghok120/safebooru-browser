import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["safebooru.org"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
