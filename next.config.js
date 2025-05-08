/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removing "output: 'export'" to support API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
