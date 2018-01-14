import keycode from './keycode';

export const SCREEN_WIDTH = 640;
export const SCREEN_HEIGHT = 360;
export const SCREEN_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

export let mainImageDataArray = null;

const state = {
  mainCanvas: null,
  mainImageData: null,
  currentDraw: () => { },
  previousDrawStartTs: 0,
  CPULoadAverage: 0,
  tick: 0,
  infoBarVisible: false,
  keyBuffer: [],
  demos: []
};

export function init(demoList) {
  state.demos = demoList;
  state.mainCanvas = createCanvas(SCREEN_HEIGHT);
  state.mainImageData = getImageData(state.mainCanvas);

  positionCanvas(state.mainCanvas);

  window.onresize = () => {
    positionCanvas(state.mainCanvas);
  };

  mainImageDataArray = state.mainImageData.data;

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

  startDemo('player');

  window.requestAnimationFrame(drawFrame);
}

export function listDemos() {
  return Object.keys(state.demos).filter(name => name !== 'player');
}

export function startDemo(name) {
  clearCanvas(state.mainCanvas, state.mainImageData);

  state.CPULoadAverage = 0;
  state.tick = 0;
  state.previousDrawStartTs = 0;

  const demo = state.demos[name];
  demo.start();
  state.currentDraw = demo.draw;

//  authorElem.innerText = demo.meta.author;
}

function createCanvas(height) {
  const canvas = document.createElement('canvas');
  canvas.width = SCREEN_WIDTH;
  canvas.height = height;
  canvas.style.position = 'absolute';
  canvas.style.boxSizing = 'border-box';

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;

  document.getElementsByTagName('body')[0].appendChild(canvas);

  return canvas;
}

function positionCanvas(canvas) {
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

function clearCanvas(canvas, imageData) {
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] = 0;
    imageData.data[i + 1] = 0;
    imageData.data[i + 2] = 0;
    imageData.data[i + 3] = 255;
  }

  canvas.getContext('2d').putImageData(imageData, 0, 0);
}

function getImageData(canvas) {
  return canvas.getContext('2d').getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function drawFrame(startTs) {
  window.requestAnimationFrame(drawFrame);
  state.tick++;

  state.mainCanvas.getContext('2d').putImageData(state.mainImageData, 0, 0);
  state.currentDraw(state.keyBuffer);

  if (state.keyBuffer.length !== 0) {
    state.keyBuffer.splice(0, state.keyBuffer.length);
  }

  const endTs = performance.now();

  if (state.previousDrawStartTs !== 0) {
    const currentLoad = (endTs - startTs) / (startTs - state.reviousDrawStartTs);
    updateCPULoadAverage(currentLoad);

    if (state.infoBarVisible && state.tick % 30 === 0) {
      const roundedAvgLoad = Math.min(Math.round(state.CPULoadAverage * 100), 100);
      const roundedCurrentLoad = Math.min(Math.round(currentLoad * 100), 100);

      // avgLoadNumberElem.innerText = roundedAvgLoad;
      // avgLoadBarElem.style.width = `${roundedAvgLoad}%`;
      // avgLoadBarElem.style.backgroundColor = roundedAvgLoad === 100 ? 'red' : '#ccc';

      // currentLoadNumberElem.innerText = roundedCurrentLoad;
      // currentLoadBarElem.style.width = `${roundedCurrentLoad}%`;
      // currentLoadBarElem.style.backgroundColor = roundedCurrentLoad === 100 ? 'red' : '#ccc';
    }
  }

  state.previousDrawStartTs = startTs;
}

function enterFullScreen() {
  const body = document.getElementsByTagName('body') [0];
  body.requestFullscreen && body.requestFullscreen();
}

function toggleInfoBar() {
  infoBarVisible = !infoBarVisible;

//  infoBarElem.style.display = infoBarVisible ? 'flex' : 'none';
}

function updateCPULoadAverage(load) {
  state.CPULoadAverage = (state.CPULoadAverage * (state.tick - 1) + load) / state.tick;
}
