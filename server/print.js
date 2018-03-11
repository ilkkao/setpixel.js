'use strict';

const chalk = require('chalk');

exports.info = function info(...values) {
  console.log(`${chalk.green('[setpixel.js]')} ${values.join(' ')}`);
};
