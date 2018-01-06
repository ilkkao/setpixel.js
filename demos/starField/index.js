import { rand, setPixel } from 'engine';
import { SCREEN_HEIGHT, SCREEN_WIDTH, trunc } from 'lib/utils';

const fastSetPixel = setPixel;
const fastRand = rand;
const fastTrunc = trunc;

const stars = [];
const NUMBER_OF_STARS = 6600;

function initStar(star, initial) {
  // origin is in the center of the screen
  star[0] = fastRand(SCREEN_WIDTH * 6) - SCREEN_WIDTH * 3; // x
  star[1] = fastRand(SCREEN_HEIGHT * 6) - SCREEN_HEIGHT * 3; // y
  star[3] = fastRand(205) + 50; // brightness

  if (initial) {
    star[2] = fastRand(14) + 1; // z
    star[4] = fastRand(10) + 1; // speed
    star[5] = fastRand(800) === 1 ? 2 : 1; // size
    star[6] = 0;
    star[7] = 0;
    star[8] = 0;
  } else {
    star[2] = 15; // z
  }
}

function drawStar(x, y, size, red, green, blue) {
  fastSetPixel(x, y, red, green, blue);

  if (size == 2) {
    fastSetPixel(x + 1, y, red, green, blue);
    fastSetPixel(x, y + 1, red, green, blue);
    fastSetPixel(x + 1, y, red, green, blue);
  }
}

function start() {
  for (var i = 0; i < NUMBER_OF_STARS; i++) {
    stars[i] = [];
    initStar(stars[i], true);
  }
}

function draw() {
  for (let i = 0; i < NUMBER_OF_STARS; i++) {
    drawStar(stars[i][6], stars[i][7], stars[i][8], 0, 0, 0);

    let x = stars[i][0] / stars[i][2] + SCREEN_WIDTH / 2;
    let y = stars[i][1] / stars[i][2] + SCREEN_HEIGHT / 2;

    if (stars[i][2] < 0 || x > SCREEN_WIDTH || x < 0 || y > SCREEN_HEIGHT || y < 0) {
      initStar(stars[i], false);
    } else {
      let size = fastTrunc(stars[i][5] / (stars[i][2] / 3));

      if (size < 1) {
        size = 1;
      }

      if (size > 2) {
        size = 2;
      }

      stars[i][2] = stars[i][2] - stars[i][4] / 120;

      let brightness = fastTrunc(stars[i][3] / (stars[i][2] / 3));

      if (brightness > 255) {
        brightness = 255;
      }

      drawStar(x, y, size, brightness, brightness, brightness);

      stars[i][6] = x;
      stars[i][7] = y;
      stars[i][8] = size;
    }
  }
}

const meta = {
  author: 'Ilkka Oksanen <iao@iki.fi>'
};

export { start, draw, meta };
