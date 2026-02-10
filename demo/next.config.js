const path = require('path');

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  defaultShowCopyCode: true,
});

const isGithubPages = process.env.GITHUB_PAGES === 'true';

module.exports = withNextra({
  output: 'export',
  images: { unoptimized: true },
  basePath: isGithubPages ? '/affirm' : '',
  assetPrefix: isGithubPages ? '/affirm/' : '',
  transpilePackages: ['affirm'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    };
    return config;
  },
});
