/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: "out",

  // Custom domain specific settings
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/generative-resume" : "",
  basePath: process.env.NODE_ENV === "production" ? "/generative-resume" : "",

  // Image optimization must be disabled for static export
  images: {
    unoptimized: true,
  },

  // ESLint configuration for build - temporarily ignore during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
