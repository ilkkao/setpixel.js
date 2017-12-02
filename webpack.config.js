var path = require('path');

module.exports = {
  entry: "./platform/player/index.js",
  output: {
      path: __dirname + '/platform/player/',
      filename: "bundle.js"
  },
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules']
  }
};
