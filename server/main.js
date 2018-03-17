'use strict';

const server = require('./server');
const yargs = require('yargs');
const print = require('./print');
const packageJSON = require('../package.json');

async function init() {
  print.info(String.raw`           _         _          _    _      `, 'green');
  print.info(String.raw`  ___  ___| |_ _ __ (_)_  _____| |  (_)___  `, 'green');
  print.info(String.raw` / __|/ _ \ __| '_ \| \ \/ / _ \ |  | / __| `, 'green');
  print.info(String.raw` \__ \  __/ |_| |_) | |>  <  __/ |_ | \__ \ `, 'green');
  print.info(String.raw` |___/\___|\__| .__/|_/_/\_\___|_(_)/ |___/  v${packageJSON.version}`, 'green');
  print.info(String.raw`              |_|                 |__/      `, 'green');
  print.info(String.raw`                                            `, 'green');

  const { argv } = yargs
    .boolean('random')
    .describe('random', 'Seed random number generator with a random seed')
    .default('random', true)
    .boolean('build')
    .describe('build', 'Build production bundle')
    .usage('Usage: $0 [options]');

  if (argv.build) {
    const compiler = require('./compiler');
    await compiler.build({ random: argv.random });
  } else {
    await server.start({ random: argv.random });
  }
}

init();
