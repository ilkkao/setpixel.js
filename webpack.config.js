const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve('platform/player/index.js'),
  output: {
    path: path.resolve(__dirname, 'platform/player/'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  }
};
