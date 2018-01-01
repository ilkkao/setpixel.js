const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === 'production';

console.log(`Production mode: ${isProduction}`);

module.exports = {
  entry: 'engine',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
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
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ManifestPlugin()
  ]
};
