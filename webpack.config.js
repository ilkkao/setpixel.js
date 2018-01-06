const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

console.log(`Production mode: ${isProduction}`); // eslint-disable-line no-console

module.exports = {
  entry: 'engine',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'bundle-[chunkhash].js' : 'bundle.js'
  },
  resolve: {
    modules: [ path.resolve(__dirname), 'node_modules' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'engine/index.html',
      inject: 'body'
    }),
  ]
};
