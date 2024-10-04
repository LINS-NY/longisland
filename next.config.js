const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    experimental: {
        workerThreads: false,
        cpus: 1
      },
};
module.exports = { nextConfig };
module.exports = withMDX({
    staticPageGenerationTimeout: 1000
})
