import pseudoRand from './internal/pseudorandom';

//
// rand()
//
export function rand(max) {
  const value = RANDOM ? Math.random() : pseudoRand();

  return Math.floor(value * (max + 1));
}

//
// setpixel()
//
export { setPixel } from './internal/layers';

//
// SCREEN_WIDTH
//
export const SCREEN_WIDTH = 640;

//
// SCREEN_HEIGHT
//
export const SCREEN_HEIGHT = 360;
