import { setPixel } from 'engine';
import { abs } from './utils';

const fastSetPixel = setPixel;
const fastAbs = abs;

// Extremely Fast Line Algorithm Var A (Division)
// Copyright 2001-2, By Po-Han Lin
// http://www.edepot.com
function line(startX, startY, endX, endY, red, green, blue) {
  let yLonger = false;
  let incrementVal;

  let shortLen = endY - startY;
  let longLen = endX - startX;

  if (fastAbs(shortLen) > fastAbs(longLen)) {
    const swap = shortLen;
    shortLen = longLen;
    longLen = swap;
    yLonger = true;
  }

  if (longLen < 0) {
    incrementVal = -1;
  } else {
    incrementVal = 1;
  }

  let divDiff;

  if (shortLen === 0) {
    divDiff = longLen;
  } else {
    divDiff = longLen / shortLen;
  }

  for (let i = 0; i !== longLen; i += incrementVal) {
    if (yLonger) {
      fastSetPixel(startX + (i / divDiff), startY + i, red, green, blue);
    } else {
      fastSetPixel(startX + i, startY + (i / divDiff), red, green, blue);
    }
  }
}

export { line };
