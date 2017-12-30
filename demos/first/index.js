import { line } from 'lib/core';
import { mainLoop } from 'platform';

function draw() {
  line(10, 10, 300, 100, 255, 0, 0);
}

function start() {
  mainLoop(draw);
};

export default start;
