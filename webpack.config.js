const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

console.log(`Production mode: ${isProduction}`); // eslint-disable-line no-console

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: 'main',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'bundle-[chunkhash].js' : 'bundle.js'
  },
  resolve: {
    modules: [ path.resolve(__dirname) ]
  },
  stats: {
    maxModules: Infinity,
    optimizationBailout: true
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: 'engine/index.html',
      inject: 'body'
    }),
  ]
};
