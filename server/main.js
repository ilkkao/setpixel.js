'use strict';

const compiler = require('../server/compiler');
const server = require('../server/server');
const yargs = require('yargs');

exports.init = function init() {
  const { argv } = yargs
    .boolean('random')
    .describe('random', 'Seed random number generator with a random seed')
    .default('random', true)
    .boolean('build')
    .describe('build', 'Build production bundle')
    .usage('Usage: $0 [options]');

  if (argv.build) {
    compiler.build({ random: argv.random });
  } else {
    server.start({ random: argv.random });
  }
};
