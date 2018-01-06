import { startDemo, listDemos } from 'engine';
import { print } from 'lib/fonts';

const demos = listDemos();
//const selected = 0;

function start() {
  print(240, 10, 3, 'setpixel.js');

  print(10, 40, 2, 'full-screen [off]');

  print(10, 90, 1, 'demos:');

  for (let i = 0; i < demos.length; i++) {
    print(10, 130 + 10 * i, 1, demos[i]);
  }
}

function draw(keys) {
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === '1') {
      startDemo(demos[0]);
    } else if (keys[i] === '2') {
      startDemo(demos[1]);
    } else if (keys[i] === '3') {
      startDemo(demos[2]);
    } else if (keys[i] === '4') {
      startDemo(demos[3]);
    }
  }
}

const meta = {
  author: 'Ilkka Oksanen <iao@iki.fi>'
};

export { start, draw, meta };
