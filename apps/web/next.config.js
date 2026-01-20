/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Transpile workspace packages
  transpilePackages: ['@app/core', '@app/ui', 'react-native', 'react-native-web', 'solito'],

  // Webpack config for React Native Web
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };

    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];

    return config;
  },

  // Optimize package imports
  experimental: {
    optimizePackageImports: ['@app/core', '@app/ui'],
  },
};

module.exports = nextConfig;
