import { imageDataArray, SCREEN_WIDTH, SCREEN_HEIGHT } from './internal';

//
// rand()
//
function rand(max) {
  return Math.floor(Math.random() * (max + 1));
}

//
// setpixel()
//
function setPixel(x, y, red, green, blue) {
  if (x < 0 || x >= SCREEN_WIDTH || y < 0 || y >= SCREEN_HEIGHT) {
    return;
  }

  const index = (Math.floor(y) * SCREEN_WIDTH + Math.floor(x)) * 4;

  imageDataArray[index] = Math.floor(red);
  imageDataArray[index + 1] = Math.floor(green);
  imageDataArray[index + 2] = Math.floor(blue);
}

export { rand, setPixel };
