const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};
module.exports = { nextConfig };
module.exports = withMDX({
    staticPageGenerationTimeout: 1000,
    experimental: {
        // This is experimental but can
        // be enabled to allow parallel threads
        // with nextjs automatic static generation
        workerThreads: false,
        cpus: 1
      },
})
