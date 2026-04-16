// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  staticPageGenerationTimeout: 1000,
  output: 'standalone',
};

module.exports = withMDX(nextConfig);