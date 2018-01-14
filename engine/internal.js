import keycode from './keycode';

export const SCREEN_WIDTH = 640;
export const SCREEN_HEIGHT = 360;
export const SCREEN_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

export let imageDataArray = null;

let canvas = null;
let ctx = null;
let imageData = null;
let currentDraw = () => { };
let previousDrawStartTs;
let CPULoadAverage;
let tick;

const infoBarElem = document.getElementById('info-bar');
const authorElem = document.getElementById('author-value');
const avgLoadBarElem = document.getElementById('avg-bar');
const avgLoadNumberElem = document.getElementById('avg-value');
const currentLoadBarElem = document.getElementById('current-bar');
const currentLoadNumberElem = document.getElementById('current-value');

let infoBarVisible = false;

const keyBuffer = [];

let demos;

export function init(demoList) {
  demos = demoList;

  canvas = document.createElement('canvas');
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
  canvas.style.position = 'absolute';
  canvas.style.boxSizing = 'border-box';

  ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;

  imageData = ctx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  imageDataArray = imageData.data;

  document.getElementsByTagName('body')[0].appendChild(canvas);
  positionCanvas();

  window.onresize = positionCanvas;

  const body = document.getElementsByTagName('body')[0];

  document.addEventListener('keydown', (e) => {
    switch (keycode(e)) {
      case 'f':
        body.requestFullscreen && body.requestFullscreen();
        break;
      case 'q':
        startDemo('player');
        break;
      case 'i':
        toggleInfoBar();
        break;
      default:
        keyBuffer.push(keycode(e));
        break;
    }
  });

  const drawFrame = (startTs) => {
    window.requestAnimationFrame(drawFrame);
    tick++;

    ctx.putImageData(imageData, 0, 0);
    currentDraw(keyBuffer);

    if (keyBuffer.length !== 0) {
      keyBuffer.splice(0, keyBuffer.length);
    }

    const endTs = performance.now();

    if (previousDrawStartTs !== 0) {
      const currentLoad = (endTs - startTs) / (startTs - previousDrawStartTs);
      updateCPULoadAverage(currentLoad);

      if (infoBarVisible && tick % 30 === 0) {
        const roundedAvgLoad = Math.min(Math.round(CPULoadAverage * 100), 100);
        const roundedCurrentLoad = Math.min(Math.round(currentLoad * 100), 100);

        avgLoadNumberElem.innerText = roundedAvgLoad;
        avgLoadBarElem.style.width = `${roundedAvgLoad}%`;
        avgLoadBarElem.style.backgroundColor = roundedAvgLoad === 100 ? 'red' : '#ccc';

        currentLoadNumberElem.innerText = roundedCurrentLoad;
        currentLoadBarElem.style.width = `${roundedCurrentLoad}%`;
        currentLoadBarElem.style.backgroundColor = roundedCurrentLoad === 100 ? 'red' : '#ccc';
      }
    }

    previousDrawStartTs = startTs;
  };

  startDemo('player');

  window.requestAnimationFrame(drawFrame);
}

function positionCanvas() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  let canvasWidth = screenWidth;
  let canvasHeight = screenHeight;

  if (screenWidth / screenHeight < SCREEN_RATIO) {
    canvasHeight = screenWidth / SCREEN_RATIO;
    canvas.style.top = `${(screenHeight - canvasHeight) / 2}px`;
  } else {
    canvasWidth = screenHeight * SCREEN_RATIO;
    canvas.style.left = `${(screenWidth - canvasWidth) / 2}px`;
  }

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
}

function clearCanvas() {
  for (let i = 0; i < imageDataArray.length; i += 4) {
    imageDataArray[i] = 0;
    imageDataArray[i + 1] = 0;
    imageDataArray[i + 2] = 0;
    imageDataArray[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
}

export function listDemos() {
  return Object.keys(demos).filter(name => name !== 'player');
}

export function startDemo(name) {
  clearCanvas();

  CPULoadAverage = 0;
  tick = 0;
  previousDrawStartTs = 0;

  const demo = demos[name];
  demo.start();
  currentDraw = demo.draw;

  authorElem.innerText = demo.meta.author;
}

function toggleInfoBar() {
  infoBarVisible = !infoBarVisible;

  infoBarElem.style.display = infoBarVisible ? 'flex' : 'none';
}

function updateCPULoadAverage(load) {
  CPULoadAverage = (CPULoadAverage * (tick - 1) + load) / tick;
}
