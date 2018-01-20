//
// rand()
//
export function rand(max) {
  return Math.floor(Math.random() * (max + 1));
}

//
// setpixel()
//
export { setPixel } from './internal/layers';
