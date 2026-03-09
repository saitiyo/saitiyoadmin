import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Standard Cloudinary host
      },
      {
        protocol: 'https',
        hostname: 'non-none', // To stop the immediate crash from the broken URL
      },
    ],
  },
};

export default nextConfig;
