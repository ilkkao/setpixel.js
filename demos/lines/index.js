import { line } from 'lib/line';

function start() {
  line(10, 10, 300, 100, 255, 0, 0);
}

function draw() {
}

const meta = {
  name: 'Lines',
  author: 'Ilkka Oksanen <iao@iki.fi>'
};

export { start, draw, meta };
