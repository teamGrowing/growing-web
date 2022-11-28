const path = require('path');

module.exports = {
  stories: [
    '../src/components/common/**/*.stories.mdx',
    '../src/components/common/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    '@storybook/addon-viewport/register',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.modules = [
      path.resolve(__dirname, '..'),
      'node_modules',
      'styles',
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve(__dirname, '../src/components'),
      assets: path.resolve(__dirname, '../src/assets'),
    };
    return config;
  },
};
