'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackConfig = require('./webpackConfig');

exports.build = function() {
  const compiler = webpack(webpackConfig({ mode: 'production' }));

  compiler.run((err, stats) => {
    const manifest = {};

    stats.toJson({ assets: true }).chunks.forEach(chunk => {
      manifest[chunk.names[0]] = chunk.files[0];
    });

    fs.writeFileSync(path.resolve(__dirname, '../dist/manifest.json'), JSON.stringify(manifest));

    console.log(stats.toString());
  });
};

exports.watch = function (fs, handler) {
  const compiler = webpack(webpackConfig({ mode: 'development' }));
  compiler.outputFileSystem = fs;

  compiler.watch({}, (err, stats) => {
    if (stats.hasErrors()) {
      console.log(stats.toString());
    } else {
      if (stats.hasWarnings()) {
        console.log(stats.toString());
      }

      handler(stats);
    }
  });
};
