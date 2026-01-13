/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Enable ISR for GitHub API data
  experimental: {
    isrMemoryCacheSize: 0, // Disable in-memory cache for edge
  },
}

module.exports = nextConfig

