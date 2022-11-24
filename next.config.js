const result = require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: result.parsed
  experimental: {
    allowMiddlewareResponseBody: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
    ],
  },
};

module.exports = nextConfig;
