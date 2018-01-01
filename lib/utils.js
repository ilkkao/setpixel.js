function trunc(value) {
  return value << 0;
}

function abs(value) {
  if (value > 0) {
    return value;
  }

  return value * -1;
}

const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 360;

export { trunc, abs, SCREEN_HEIGHT, SCREEN_WIDTH };
