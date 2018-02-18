import keycode from './keycode';
import { SCREEN_RATIO } from './constants';
import * as infoBar from './infoBar';
import * as layers from './layers';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils';

const state = {
  canvas: null,
  ctx: null,
  appDrawCallback: () => {},
  CPULoadAverage: 0,
  tick: 0,
  infoBarVisible: false,
  keyBuffer: [],
  demos: [],
  fps: 0,
  fpsTs: 0,
  fpsPreviousTick: 0
};

export function init(demoList) {
  state.demos = demoList;

  const canvas = document.createElement('canvas');
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
  canvas.style.position = 'fixed';
  canvas.style.boxSizing = 'border-box';
  state.canvas = canvas;

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  state.ctx = ctx;

  document.getElementsByTagName('body')[0].appendChild(canvas);

  window.addEventListener('resize', positionCanvas, true);
  document.addEventListener('fullscreenchange', positionCanvas, true);

  positionCanvas();

  document.addEventListener('keydown', (e) => {
    switch (keycode(e)) {
      case 'f':
        enterFullScreen();
        break;
      case 'q':
        startDemo('player');
        break;
      case 'i':
        toggleInfoBar();
        break;
      default:
        state.keyBuffer.push(keycode(e));
        break;
    }
  });

  infoBar.init();

  layers.createLayer('main', 2, SCREEN_WIDTH, SCREEN_HEIGHT);

  startDemo('player');

  window.requestAnimationFrame(drawFrame);
}

export function listDemos() {
  const list = [];

  Object.entries(state.demos).filter(demo => demo[0] !== 'player').forEach(demo => {
    list.push([ demo[0], demo[1].meta.name ]);
  });

  return list;
}

export function startDemo(name) {
  layers.clearLayer('main');

  state.CPULoadAverage = 0;
  state.tick = 0;
  state.previousDrawStartTs = 0;
  state.fps = 0;
  state.fpsTs = performance.now();
  state.fpsPreviousTick = 0;

  const demo = state.demos[name];
  demo.start && demo.start();
  state.appDrawCallback = demo.draw;

  infoBar.setAuthor(demo.meta.author);
}

function positionCanvas() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  let canvasWidth = screenWidth;
  let canvasHeight = screenHeight;

  if (screenWidth / screenHeight < SCREEN_RATIO) {
    canvasHeight = screenWidth / SCREEN_RATIO;
  } else {
    canvasWidth = screenHeight * SCREEN_RATIO;
  }

  state.canvas.style.top = `${Math.floor((screenHeight - canvasHeight) / 2)}px`;
  state.canvas.style.left = `${Math.floor((screenWidth - canvasWidth) / 2)}px`;
  state.canvas.style.width = `${Math.floor(canvasWidth)}px`;
  state.canvas.style.height = `${Math.floor(canvasHeight)}px`;
}

function drawFrame(startTs) {
  window.requestAnimationFrame(drawFrame);

  if (startTs - state.fpsTs >= 1000) {
    state.fps = state.tick - state.fpsPreviousTick;
    state.fpsPreviousTick = state.tick;
    state.fpsTs = startTs;
  }

  state.tick++;

  layers.drawLayers(state.ctx);

  layers.switchSetPixelLayer('main');
  state.appDrawCallback(state.keyBuffer);

  if (state.keyBuffer.length !== 0) {
    state.keyBuffer.splice(0, state.keyBuffer.length);
  }

  const endTs = performance.now();

  if (state.previousDrawStartTs !== 0) {
    const currentLoad = (endTs - startTs) / (startTs - state.previousDrawStartTs);
    updateCPULoadAverage(currentLoad);

    if (state.infoBarVisible && state.tick % 30 === 0) {
      const roundedAvgLoad = Math.min(Math.round(state.CPULoadAverage * 100), 100);
      const roundedCurrentLoad = Math.min(Math.round(currentLoad * 100), 100);

      layers.switchSetPixelLayer('info');
      infoBar.update(roundedCurrentLoad, roundedAvgLoad, state.fps || '-');
    }
  }

  state.previousDrawStartTs = startTs;
}

function enterFullScreen() {
  const body = document.getElementsByTagName('body') [0];
  body.requestFullscreen && body.requestFullscreen();

  positionCanvas();
}

function toggleInfoBar() {
  state.infoBarVisible = !state.infoBarVisible;
  infoBar.setVisibility(state.infoBarVisible);
}

function updateCPULoadAverage(load) {
  state.CPULoadAverage = (state.CPULoadAverage * (state.tick - 1) + load) / state.tick;
}
