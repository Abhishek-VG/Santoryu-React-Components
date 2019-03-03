const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve('src'),
  mode: 'development',
  entry: {
    santoryu: './index.tsx'
  },
  output: {
    path: path.resolve('build'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: path.resolve('public/index.html') })]
};
