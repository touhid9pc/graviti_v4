import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "pngimg.com",
      },
      {
        protocol: "https",
        hostname: "www.citypng.com",
      },
      {
        protocol: "https",
        hostname: "www.pngplay.com",
      },
    ],
  },
};

export default nextConfig;
