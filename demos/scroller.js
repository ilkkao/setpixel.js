import { SCREEN_HEIGHT, SCREEN_WIDTH, rand, mainLoop, setPixel } from 'platform';
import { trunc } from 'lib/core';

const BLOCK_WIDTH = 10;
const BLOCK_HEIGHT = 10;
const SCREEN_WIDTH_IN_BLOCKS = SCREEN_WIDTH / BLOCK_WIDTH;
const SCREEN_HEIGHT_IN_BLOCKS = SCREEN_HEIGHT / BLOCK_HEIGHT;
const WORLD_WIDTH_IN_BLOCKS = SCREEN_WIDTH_IN_BLOCKS * 10;
const WORLD_HEIGHT_IN_BLOCKS = SCREEN_HEIGHT_IN_BLOCKS;

const block = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 0, 0, 0, 0, 1, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 1, 0, 0, 0, 0, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

const world = [];
let xCamera = 0;
let direction = 1;

function drawScreen(offset) {
  const remainder = offset % BLOCK_WIDTH;
  const offsetInBlocks = trunc(offset / BLOCK_WIDTH)

  for (let y = 0; y < SCREEN_HEIGHT_IN_BLOCKS; y++) {
    for (let x = 0; x < SCREEN_WIDTH_IN_BLOCKS + 2; x++) {
      drawBlock(x * BLOCK_WIDTH - remainder - BLOCK_WIDTH, y * BLOCK_HEIGHT, world[y * WORLD_WIDTH_IN_BLOCKS + x + offsetInBlocks]);
    }
  }
}

function drawBlock(x, y, type) {
  for (let innerY = 0; innerY < BLOCK_HEIGHT; innerY++) {
    for (let innnerX = 0; innnerX < BLOCK_WIDTH; innnerX++) {
      if (type === 1) {
        setPixel(x + innnerX, y + innerY, 0, block[innerY * BLOCK_WIDTH + innnerX] * 254, 0);
      } else {
        setPixel(x + innnerX, y + innerY, 0, 0, 0);
      }
    }
  }
}

function draw() {
  drawScreen(xCamera);

  xCamera += direction;

  if (xCamera === -1) {
    direction = 1;
    xCamera = 1;
  } else if (xCamera === 600) { // fix me
    direction = -1;
    xCamera = 599;
  }
}

function start() {
  for (let y = 0; y < WORLD_HEIGHT_IN_BLOCKS; y++) {
    for (let x = 0; x < WORLD_WIDTH_IN_BLOCKS * 10; x++) {
      world[y * WORLD_WIDTH_IN_BLOCKS + x] = rand(1);
    }
  }

  mainLoop(draw);
}

export default start;

