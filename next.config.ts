import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      // Vercel Blob — production media storage
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      // Local dev uploads served by Next.js
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default withPayload(nextConfig);
