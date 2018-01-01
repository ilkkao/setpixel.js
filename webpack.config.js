const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === 'production';

console.log(`Production mode: ${isProduction}`);

module.exports = {
  entry: 'engine',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'bundle-[chunkhash].js' : 'bundle.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Setpixel.js'
    }),
    new ExtractTextPlugin('styles-[chunkhash].css'),
    new ManifestPlugin()
  ]
};
