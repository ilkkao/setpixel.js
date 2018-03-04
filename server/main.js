'use strict';

const compiler = require('../server/compiler');
const server = require('../server/server');
const yargs = require('yargs');

exports.init = function init() {
  const { argv } = yargs
    .boolean('no-random')
    .describe('no-random', 'Seed random number generator with value 42')
    .boolean('build')
    .describe('build', 'Build production bundle')
    .usage('Usage: $0 [options]');

  if (argv.build) {
    compiler.build();
  } else {
    server.start();
  }
};
