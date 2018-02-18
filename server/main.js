'use strict';

const compiler = require('./compiler');
const server = require('./server');

if (process.argv[2] == '--build') {
  compiler.build();
} else {
  server.start();
}
