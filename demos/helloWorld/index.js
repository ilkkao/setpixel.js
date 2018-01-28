import { setPixel } from 'engine';

let currentColor = 0;

function start() {
}

function draw() {
  for (let i = 0; i < 360; i++) {
    setPixel(i + 130, i, currentColor, 255, currentColor);
    setPixel(i + 130, 360 - i, 255, currentColor, currentColor);
  }

  currentColor++;

  if (currentColor === 255) {
    currentColor = 0;
  }
}

const meta = {
  name: 'Hello world',
  author: 'Ilkka Oksanen <iao@iki.fi>'
};

export { start, draw, meta };
