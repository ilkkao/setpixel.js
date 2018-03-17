import { line } from 'lib/line';

let previousX;
let previousY;
let mouseHasBeenUp;

function start() {
  previousX = null;
  previousY = null;
  mouseHasBeenUp = false;
}

function draw(ts, keys, mouseX, mouseY, mouseClick, mouseDown) {
  if ((mouseX !== previousY || mouseY !== previousY) && mouseDown && mouseHasBeenUp) {
    line(previousX, previousY, mouseX, mouseY, 255, 255, 255);
  }

  previousX = mouseX;
  previousY = mouseY;

  if (!mouseDown) {
    mouseHasBeenUp = true;
  }
}

const meta = {
  name: 'Mouse Draw',
  author: 'Ilkka Oksanen <iao@iki.fi>'
};

export { start, draw, meta };
