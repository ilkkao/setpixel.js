import { SCREEN_WIDTH, SCREEN_HEIGHT } from './constants';

const layers = {};
let visibleImageDatas = [];
let currentSetPixelArray = null;

export function createLayer(name, zIndex, width, height) {
  const imageData = new ImageData(width, height);
  const imageDataArray = imageData.data;

  clearImageDataArray(imageDataArray);

  layers[name] = { imageData, imageDataArray, zIndex, visible: true };

  updateVisibleImageDatas();

  currentSetPixelArray = imageDataArray;
}

export function switchSetPixelLayer(layer) {
  currentSetPixelArray = layers[layer].imageDataArray;
}

export function clearLayer(layer) {
  clearImageDataArray(layers[layer].imageDataArray);
}

export function showLayer(layer) {
  layers[layer].visible = true;

  updateVisibleImageDatas();
}

export function hideLayer(layer) {
  layers[layer].visible = false;

  updateVisibleImageDatas();
}

export function drawLayers(ctx) {
  visibleImageDatas.forEach(imageData => ctx.putImageData(imageData, 0, 0));
}

export function setPixel(x, y, red, green, blue) {
  if (x < 0 || x >= SCREEN_WIDTH || y < 0 || y >= SCREEN_HEIGHT) {
    return;
  }

  const index = (Math.floor(y) * SCREEN_WIDTH + Math.floor(x)) * 4;

  // Uint8ClampedArray checks and rounds the color values, no need to verify them
  currentSetPixelArray[index] = red;
  currentSetPixelArray[index + 1] = green;
  currentSetPixelArray[index + 2] = blue;
}

function updateVisibleImageDatas() {
  visibleImageDatas = Object.values(layers)
    .sort((a, b) => b.zIndex - a.zIndex)
    .filter(layer => layer.visible)
    .map(layer => layer.imageData);
}

function clearImageDataArray(imageDataArray) {
  imageDataArray.fill(0);

  for (let i = 0; i < imageDataArray.length; i += 4) {
    imageDataArray[i + 3] = 255;
  }
}
