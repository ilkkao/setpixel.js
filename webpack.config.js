const path = require('path');

module.exports = {
  entry: 'engine',
  output: {
    path: path.resolve(__dirname, 'player'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  }
};
