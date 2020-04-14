const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.[tj]s([x])?',
  ],
  addons: ['@storybook/addon-actions', '@storybook/addon-links','@storybook/addon-knobs/register'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options:{
            tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),

          }
        },
        {
          loader: require.resolve('ts-loader'),
          options: {
            configFile: path.join(__dirname, 'tsconfig.json')
          }
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  }
};
