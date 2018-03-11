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
