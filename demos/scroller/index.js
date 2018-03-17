import { rand, setPixel } from 'engine';
import { SCREEN_HEIGHT, SCREEN_WIDTH, trunc } from 'lib/utils';

const BLOCK_WIDTH = 9;
const BLOCK_HEIGHT = 9;
const SCREEN_WIDTH_IN_BLOCKS = trunc(SCREEN_WIDTH / (BLOCK_WIDTH - 1));
const SCREEN_HEIGHT_IN_BLOCKS = trunc(SCREEN_HEIGHT / (BLOCK_HEIGHT - 1));
const WORLD_WIDTH_IN_BLOCKS = SCREEN_WIDTH_IN_BLOCKS * 10;
const WORLD_HEIGHT_IN_BLOCKS = SCREEN_HEIGHT_IN_BLOCKS;

const block = [
  1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 1, 1, 1, 1, 1, 1, 0,
  1, 0, 1, 0, 0, 0, 0, 1, 0,
  1, 0, 1, 0, 1, 1, 0, 1, 0,
  1, 0, 1, 0, 1, 1, 0, 1, 0,
  1, 0, 1, 0, 0, 0, 0, 1, 0,
  1, 0, 1, 1, 1, 1, 1, 1, 0,
  1, 0, 0, 0, 0, 0, 0, 0, 0,
];

const world = [];
let xCamera;
let direction;

function drawTile(ts, x, y, type, prev, above, under) {
  for (let innerY = 0; innerY < BLOCK_HEIGHT; innerY++) {
    for (let innerX = 0; innerX < BLOCK_WIDTH; innerX++) {
      if (type === 1) {
        setPixel(x + innerX, y + innerY, 0, block[innerY * BLOCK_WIDTH + innerX] * 255, 0);
      } else if ((above === 1 && innerY === 0) || (prev === 1 && innerX === 0) || (under === 1 && innerX === 0 && innerY === 0)) {
        setPixel(x + innerX, y + innerY, 0, 255, 0);
      } else {
        setPixel(x + innerX, y + innerY, 0, 0, 0);
      }
    }
  }
}

function drawScreen(offset) {
  const remainder = offset % BLOCK_WIDTH;
  const offsetInBlocks = trunc(offset / BLOCK_WIDTH);

  for (let y = 0; y < SCREEN_HEIGHT_IN_BLOCKS; y++) {
    let prevBlock = 0;

    for (let x = 0; x < SCREEN_WIDTH_IN_BLOCKS + 2; x++) {
      const index = y * WORLD_WIDTH_IN_BLOCKS + x + offsetInBlocks;

      const xBlock = x * BLOCK_WIDTH - remainder - BLOCK_WIDTH;
      const yBlock = y * BLOCK_HEIGHT;
      const type = world[index];
      const aboveBlock = y === 0 ? 0 : world[index - WORLD_WIDTH_IN_BLOCKS];
      const belowBlock = y === 0 ? 0 : world[index - WORLD_WIDTH_IN_BLOCKS - 1];

      drawTile(xBlock, yBlock, type, prevBlock, aboveBlock, belowBlock);

      prevBlock = type;
    }
  }
}

function start() {
  xCamera = 0;
  direction = 1;

  for (let y = 0; y < WORLD_HEIGHT_IN_BLOCKS; y++) {
    for (let x = 0; x < WORLD_WIDTH_IN_BLOCKS * 10; x++) {
      world[y * WORLD_WIDTH_IN_BLOCKS + x] = rand(2);
    }
  }
}

function draw() {
  drawScreen(xCamera);

  xCamera += direction;

  if (xCamera === -1) {
    direction = 1;
    xCamera = 1;
  } else if (xCamera === 600) {
    direction = -1;
    xCamera = 598;
  }
}

const meta = {
  name: 'Scroller',
  author: 'Ilkka Oksanen <iao@iki.fi>'
};

export { start, draw, meta };
