const path = require('path');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        alias: {
          [pkg.name]: path.join(root, 'lib'),
        },
      },
    ],
  ],
};
