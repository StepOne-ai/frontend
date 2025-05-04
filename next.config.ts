import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb", // Optional: Limit the size of the request body
      allowedOrigins: ["*"], // Optional: Restrict allowed origins
    },
  },
};
export default nextConfig;
