import { line } from 'lib/line';

let previousX = null;
let previousY = null;

function draw(keys, mouseX, mouseY, mouseClick, mouseDown) {
  if ((mouseX !== previousY || mouseY !== previousY) && mouseDown) {
    line(previousX, previousY, mouseX, mouseY, 255, 255, 255);
  }

  previousX = mouseX;
  previousY = mouseY;
}

const meta = {
  name: 'Mouse Draw',
  author: 'Ilkka Oksanen <iao@iki.fi>'
};

export { draw, meta };
