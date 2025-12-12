// next.config.js
const path = require('path');
const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  staticPageGenerationTimeout: 1000,

  webpack: (config, { isServer }) => {
    // ensure .jsx/.tsx are resolvable
    config.resolve.extensions = Array.from(new Set([
      '.js', '.jsx', '.ts', '.tsx', '.json', ...(config.resolve.extensions || [])
    ]));

    // aliases
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // make @ point to src so "@/components/..." resolves to src/components/...
      '@': path.resolve(__dirname, 'src'),
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@data': path.resolve(__dirname, 'data'),
      '@lib': path.resolve(__dirname, 'lib'),
      '@public': path.resolve(__dirname, 'public')
    };

    // small runtime check so you can see this message in the build logs
    if (!process.env.NEXT_CONFIG_LOGGED) {
      // eslint-disable-next-line no-console
      console.log('Next config: webpack aliases set (@ -> src, @components -> src/components)');
      process.env.NEXT_CONFIG_LOGGED = '1';
    }

    return config;
  }
};

module.exports = withMDX(nextConfig);
