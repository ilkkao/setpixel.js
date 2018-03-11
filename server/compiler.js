'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackConfig = require('./webpackConfig');
const generateDemoIndex = require('./generateDemoIndex');

exports.build = function build(options) {
  generateDemoIndex();

  const compiler = webpack(webpackConfig({ mode: 'production', random: options.random }));

  compiler.run((err, stats) => {
    const manifest = {};

    stats.toJson({ assets: true }).chunks.forEach(chunk => {
      [manifest[chunk.names[0]]] = chunk.files;
    });

    fs.writeFileSync(path.resolve(__dirname, '../dist/manifest.json'), JSON.stringify(manifest));

    console.log(stats.toString());

    if (!err && !stats.hasErrors()) {
      console.log('Production build succeeded. Saved to /dist directory.');
    } else {
      console.log('ERROR: Production build failed');
    }
  });
};

exports.watch = function watch(buildFs, options, handler) {
  generateDemoIndex();

  const compiler = webpack(webpackConfig({ mode: 'development', random: options.random }));
  compiler.outputFileSystem = buildFs;

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
