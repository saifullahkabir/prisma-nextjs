import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: "thumbs.dreamstime.com"
      },
      {
        hostname: "cdn.pixabay.com"
      },
      {
        hostname: "via.placeholder.com"
      },
    ]
  }
};

export default nextConfig;
