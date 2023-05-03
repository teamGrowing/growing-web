const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: [
    '../src/components/**/**/*.stories.mdx',
    '../src/components/**/**/*.stories.@(js|jsx|ts|tsx)',
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
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve(__dirname, '../src/components'),
      assets: path.resolve(__dirname, '../src/assets'),
      styles: path.resolve(__dirname, '../src/styles'),
    };
    config.resolve.plugins.push(new TsconfigPathsPlugin({}));
    return config;
  },
};
