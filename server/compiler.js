'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackConfig = require('./webpackConfig');
const generateDemoIndex = require('./generateDemoIndex');

exports.build = function build() {
  generateDemoIndex();

  const compiler = webpack(webpackConfig({ mode: 'production' }));

  compiler.run((err, stats) => {
    const manifest = {};

    stats.toJson({ assets: true }).chunks.forEach(chunk => {
      [manifest[chunk.names[0]]] = chunk.files;
    });

    fs.writeFileSync(
      path.resolve(__dirname, '../dist/manifest.json'),
      JSON.stringify(manifest)
    );

    console.log(stats.toString()); // eslint-disable-line no-console
  });
};

exports.watch = function watch(buildFs, handler) {
  generateDemoIndex();

  const compiler = webpack(webpackConfig({ mode: 'development' }));
  compiler.outputFileSystem = buildFs;

  compiler.watch({}, (err, stats) => {
    if (stats.hasErrors()) {
      console.log(stats.toString()); // eslint-disable-line no-console
    } else {
      if (stats.hasWarnings()) {
        console.log(stats.toString()); // eslint-disable-line no-console
      }

      handler(stats);
    }
  });
};
