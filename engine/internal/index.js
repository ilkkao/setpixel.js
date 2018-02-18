import Navigo from 'navigo';
import keycode from './keycode';
import { SCREEN_RATIO } from './constants';
import * as infoBar from './infoBar';
import * as layers from './layers';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils';

const state = {
  canvas: null,
  canvasScaleX: 1,
  canvasScaleY: 1,
  ctx: null,
  appDrawCallback: () => {},
  CPULoadAverage: 0,
  tick: 0,
  infoBarVisible: false,
  keyBuffer: [],
  demos: [],
  fps: 0,
  fpsTs: 0,
  fpsPreviousTick: 0,
  mouseX: null,
  mouseY: null,
  mouseDown: false,
  mouseClick: false
};

const router = new Navigo(window.location.origin);

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

  canvas.addEventListener('mousemove', event => {
    state.mouseX = Math.floor((event.clientX - canvas.offsetLeft) * state.canvasScaleX);
    state.mouseY = Math.floor((event.clientY - canvas.offsetTop) * state.canvasScaleY);
  }, true);

  canvas.addEventListener('click', () => state.mouseClick = true, false);
  canvas.addEventListener('mousedown', () => state.mouseDown = true, false);
  canvas.addEventListener('mouseup', () => state.mouseDown = false, false);

  positionCanvas();

  document.addEventListener('keydown', (e) => {
    switch (keycode(e)) {
      case 'f':
        enterFullScreen();
        break;
      case 'esc':
        router.navigate('/');
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

  window.requestAnimationFrame(drawFrame);

  router.on('/:name', ({ name }) => {
    if (listDemos().find(demo => demo[0] === name)) {
      execDemo(name);
    } else {
      router.navigate('/');
    }
  });
  router.on(() => execDemo('player'));
  router.notFound(() => router.navigate('/'));
  router.resolve();
}

export function listDemos() {
  const list = [];

  Object.entries(state.demos).filter(demo => demo[0] !== 'player').forEach(demo => {
    list.push([ demo[0], demo[1].meta.name ]);
  });

  return list;
}

export function startDemo(name) {
  router.navigate(`/${name}`);
}

function execDemo(name) {
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

  state.canvasScaleX = SCREEN_WIDTH / canvasWidth;
  state.canvasScaleY = SCREEN_HEIGHT / canvasHeight;
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

  state.appDrawCallback(state.keyBuffer, state.mouseX, state.mouseY, state.mouseClick, state.mouseDown);

  if (state.keyBuffer.length !== 0) {
    state.keyBuffer = [];
  }

  if (state.mouseClick) {
    state.mouseClick = false;
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
