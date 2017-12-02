const RATIO_16_9 = 16 / 9;
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 360;

let canvas = null;
let ctx = null;
let imageData = null;
let imageDataArray = null;

function init() {
  canvas = document.createElement('canvas');
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
  canvas.style.position = "absolute";
  canvas.style.boxSizing = 'border-box';

  ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;

  imageData = ctx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  imageDataArray = imageData.data;

  // Set alpha to 255
  for (let i = 0; i < imageDataArray.length; i += 4) {
    imageDataArray[i + 3] = 255;
  }

  document.getElementsByTagName("body")[0].appendChild(canvas);
  positionCanvas();

  window.onresize = () => positionCanvas;
}

function positionCanvas() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  let canvasWidth = screenWidth;
  let canvasHeight = screenHeight;

  if (screenWidth / screenHeight < RATIO_16_9) {
    canvasHeight = screenWidth / RATIO_16_9;
    canvas.style.top = (screenHeight - canvasHeight) / 2;
  } else {
    canvasWidth = screenHeight * RATIO_16_9;
    canvas.style.left = (screenWidth - canvasWidth) / 2;
  }

  canvas.style.width = canvasWidth;
  canvas.style.height = canvasHeight;
}

function mainLoop(callback) {
  const one = () => {
    ctx.putImageData(imageData, 0, 0);
    callback();

    window.requestAnimationFrame(one)
  }

  window.requestAnimationFrame(one);
}

function setPixel(x, y, red, green, blue) {
  let index = ((y << 0) * SCREEN_WIDTH + (x << 0)) * 4;

  imageDataArray[index] = red;
  imageDataArray[++index] = green;
  imageDataArray[++index] = blue;
}

function rand(max) {
  return Math.floor(Math.random() * (max + 1));
}

export { SCREEN_WIDTH, SCREEN_HEIGHT, init, mainLoop, setPixel, rand };
