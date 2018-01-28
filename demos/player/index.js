import { setPixel } from 'engine';
import { startDemo, listDemos } from 'engine/internal';
import { print } from './print';

let demos;
let selected;

const LOGO_WIDTH = 62;
const LOGO_HEIGHT = 7;
const LOGO_ZOOM = 3;

const logo = [
  [1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,0],
  [1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1,1,0],
  [1,0,0,0,1,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,0,1,0,1,1,0,1,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,1,1,1,0,1,0,1,0,0,0,1,0],
  [1,1,1,0,1,0,1,0,1,1,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0],
  [1,0,0,0,1,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0],
  [1,1,1,1,1,0,1,1,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0]
];

export const meta = {
  author: 'Ilkka Oksanen <iao@iki.fi>'
};

export function start() {
  demos = listDemos();
  selected = 0;

  let x = 320 - LOGO_WIDTH * LOGO_ZOOM / 2;
  let y = 180 - LOGO_HEIGHT * LOGO_ZOOM / 2 - 150;

  drawLogo(x, y, LOGO_ZOOM);

  print(100, 100, 'Setpixel.js is a back to basic demo framework!');
  print(100, 180, '!"#$%&\'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  print(10, 40, 'full-screen [off]');
  print(10, 90, 'WWW demos:');

  for (let i = 0; i < demos.length; i++) {
    print(10, 130 + 10 * i, demos[i]);
  }
}

export function draw(keys) {
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

function drawLogo(x, y, zoom) {
  for (let row = 0; row < LOGO_HEIGHT * zoom; row++) {
    for (let column = 0; column < LOGO_WIDTH * zoom; column++) {
      let yy = Math.round(row / zoom - 0.5);
      let xx = Math.round(column / zoom - 0.5);

      if (yy > 6) {
        yy = 6;
      }

      if (xx > 63) {
        xx = 63;
      }

      if (logo[yy][xx] === 1) {
        setPixel(x + column, y + row, 0, 255, 0);
      }
    }
  }
}
