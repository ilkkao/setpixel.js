'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackConfig = require('./webpackConfig');
const generateDemoIndex = require('./generateDemoIndex');
const print = require('./print');

exports.build = async function build(options) {
  await generateDemoIndex();

  const compiler = webpack(webpackConfig({ mode: 'production', random: options.random }));

  compiler.run((err, stats) => {
    const manifest = {};

    stats.toJson({ assets: true }).chunks.forEach(chunk => {
      [manifest[chunk.names[0]]] = chunk.files;
    });

    fs.writeFileSync(path.resolve(__dirname, '../dist/manifest.json'), JSON.stringify(manifest));

    print.info(stats.toString());

    if (!err && !stats.hasErrors()) {
      print.info('Production build succeeded. Saved to /dist directory.');
    } else {
      print.info('ERROR: Production build failed');
    }
  });
};

exports.watch = async function watch(buildFs, options, beforeHandler, afterHandler) {
  await generateDemoIndex();

  const compiler = webpack(webpackConfig({ mode: 'development', random: options.random }));
  compiler.outputFileSystem = buildFs;

  compiler.plugin('watch-run', (compilation, callback) => {
    beforeHandler();
    callback();
  });

  compiler.watch({}, (err, stats) => {
    if (stats.hasErrors()) {
      print.info(stats.toString());
    } else {
      if (stats.hasWarnings()) {
        print.info(stats.toString());
      }

      afterHandler(stats);
    }
  });
};
