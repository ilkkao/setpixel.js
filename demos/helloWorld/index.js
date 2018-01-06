import { setPixel } from 'engine';

const fastSetPixel = setPixel;
let currentColor = 0;

function start() {
}

function draw() {
  for (let i = 0; i < 360; i++) {
    fastSetPixel(i + 130, i, currentColor, 255, currentColor);
    fastSetPixel(i + 130, 360 - i, 255, currentColor, currentColor);
  }

  currentColor++;

  if (currentColor === 255) {
    currentColor = 0;
  }
}

const meta = {
  author: 'Ilkka Oksanen <iao@iki.fi>'
};

export { start, draw, meta };
