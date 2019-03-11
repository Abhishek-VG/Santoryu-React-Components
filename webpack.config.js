const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = 'development'; // temp

module.exports = {
  context: path.resolve('src'),
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    santoryu: './index.tsx'
  },
  output: {
    path: path.resolve('build'),
    filename: mode === 'production' ? '[chunkhash].js' : '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  plugins: [new HtmlWebpackPlugin({ template: path.resolve('public/index.html') })],
  devServer: {
    port: 1234,
    open: true,
    noInfo: false,
    // hotOnly: true,
    hot: true
  }
};
