import { start as startPlayer, draw as drawPlayer } from 'player';
import './index.css';

const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 360;
const SCREEN_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

let canvas = null;
let ctx = null;
let imageData = null;
let imageDataArray = null;
let currentDraw = () => { };

function init() {
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

  const drawFrame = () => {
    window.requestAnimationFrame(drawFrame);
    ctx.putImageData(imageData, 0, 0);
    currentDraw();
  };

  drawFrame();

  startDemo(startPlayer, drawPlayer);
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

function startDemo(start, draw) {
  clearCanvas();
  start();

  currentDraw = draw;
}

document.addEventListener('DOMContentLoaded', init);

function rand(max) {
  return Math.floor(Math.random() * (max + 1));
}

function setPixel(x, y, red, green, blue) {
  if (x < 0 || x >= SCREEN_WIDTH || y < 0 || y >= SCREEN_HEIGHT) {
    return;
  }

  const index = ((y << 0) * SCREEN_WIDTH + (x << 0)) * 4;

  imageDataArray[index] = red << 0;
  imageDataArray[index + 1] = green << 0;
  imageDataArray[index + 2] = blue << 0;
}

export { SCREEN_WIDTH, SCREEN_HEIGHT, rand, setPixel, startDemo };
