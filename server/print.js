'use strict';

const chalk = require('chalk');

exports.info = function info(text, color = 'blue') {
  console.log(`${chalk.yellow('[setpixel.js]')} ${chalk[color](text)}`);
};
