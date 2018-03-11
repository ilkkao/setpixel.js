import { setPixel } from 'engine';
import { startDemo, listDemos } from 'engine/internal';
import { print } from './print';
import { SCREEN_WIDTH } from '../../lib/utils';

let demos;
let selected = 0;
let prevMouseX;
let prevMouseY;

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
  prevMouseX = null;
  prevMouseY = null;

  let x = 320 - LOGO_WIDTH * LOGO_ZOOM / 2;
  let y = 180 - LOGO_HEIGHT * LOGO_ZOOM / 2 - 150;

  drawLogo(x, y, LOGO_ZOOM);

  print(165, 60, 'Setpixel.js is a back to basics demo framework!');
  print(35, 320, 'Press [esc] to quit the demo, [f] to enter full-screen, and [i] to see performance details');
}

export function draw(keys, mouseX, mouseY, mouseClick, mouseDown) {
  drawRectangle(0, 80, SCREEN_WIDTH, 230, 0, 0, 0);

  let ym = Math.floor((mouseY - 130) / 11);

  if (ym < 0) {
    ym = 0;
  }

  if (ym >= demos.length) {
    ym = demos.length - 1;
  }

  if ((prevMouseX !== null && prevMouseX !== mouseX) || (prevMouseY !== null && prevMouseY !== mouseY)) {
    selected = ym;
  }

  prevMouseX = mouseX;
  prevMouseY = mouseY;

  if (mouseClick) {
    startDemo(demos[selected][0]);
    return;
  }

  for (let i = 0; i < demos.length; i++) {
    const y = 130 + 11 * i;

    if (i === selected) {
      drawRectangle(57, y - 2, 100, 11, 100, 100, 100);
    }

    print(60, y, demos[i][1]);
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (key === 'down') {
      selected++;
    } else if (key === 'up') {
      selected--;
    } else if (key === 'enter' || key === 'space') {
      startDemo(demos[selected][0]);
      return;
    }
  }

  if (selected === demos.length) {
    selected = 0;
  } else if (selected === -1) {
    selected = demos.length - 1;
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

function drawRectangle(x, y, width, height, red, green, blue) {
  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      setPixel(x + column, y + row, red, green, blue);
    }
  }
}
