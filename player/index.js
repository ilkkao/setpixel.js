import Mousetrap from 'mousetrap';
import { startDemo } from 'engine';
import * as linesDemo from 'demos/lines';
import * as scrollerDemo from 'demos/scroller';
import * as starFieldDemo from 'demos/starField';
import * as helloWorldDemo from 'demos/helloWorld';
import { print } from 'lib/fonts';

function switchDemo(demo) {
  startDemo(demo.start, demo.draw);
}

function start() {
  print(10, 10, 3, '> setpixel.js');

  Mousetrap.bind('1', () => switchDemo(helloWorldDemo));
  Mousetrap.bind('2', () => switchDemo(linesDemo));
  Mousetrap.bind('3', () => switchDemo(scrollerDemo));
  Mousetrap.bind('4', () => switchDemo(starFieldDemo));
}

function draw() {
}

export { start, draw };
