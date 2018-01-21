import { SCREEN_WIDTH } from './constants';
import { print } from './print';
import * as layers from './layers';

let author = '';

const INFO_BAR_HEIGHT = 10;
const BAR_WIDTH = 100;
const BAR_HEIGHT = 6;

export function init() {
  layers.createLayer('info', 1, SCREEN_WIDTH, INFO_BAR_HEIGHT);
  layers.hideLayer('info');
}

export function update(currentLoad, avgLoad) {
  layers.clearLayer('info');

  drawBar(65, 2, currentLoad / 100);
  drawBar(269, 2, avgLoad / 100);

  const currentLoadString = 'CPU: ' + (currentLoad < 10 ? ' ' : '') + currentLoad.toString() + '%';
  const avgLoadString = 'Avg CPU: ' + (avgLoad < 10 ? ' ' : '') + avgLoad.toString() + '%';

  print(1, 2, currentLoadString);
  print(177, 2, avgLoadString);
  print(380, 2, `Author: ${author}`.toUpperCase());
}

export function setAuthor(name) {
  author = name;
}

export function setVisibility(show) {
  show ? layers.showLayer('info') : layers.hideLayer('info');
}

function drawBar(x, y, value) {
  for (let i = 0; i < BAR_WIDTH; i++) {
    layers.setPixel(x + i, y, 255, 255, 255);
    layers.setPixel(x + i, y + BAR_HEIGHT, 255, 255, 255);
  }

  for (let i = 1; i < BAR_HEIGHT; i++) {
    layers.setPixel(x, y + i, 255, 255, 255);
    layers.setPixel(x + BAR_WIDTH - 1, y + i, 255, 255, 255);
  }

  const barLength = Math.ceil((value > 1 ? 1 : value) * (BAR_WIDTH - 4));

  for (let i = 0; i < barLength; i++) {
    for (let ii = 2; ii < BAR_HEIGHT - 1; ii++) {
      layers.setPixel(x + i + 2, y + ii, 255, 255, 255, true);
    }
  }
}
