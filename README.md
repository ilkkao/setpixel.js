# Setpixel.js

[![Build Status](https://travis-ci.org/ilkkao/setpixel.js.svg?branch=master)](https://travis-ci.org/ilkkao/setpixel.js)

WIP

## Getting started

```
$ git clone git@github.com:ilkkao/setpixel.js.git
$ cd setpixel.js
$ npm install
$ npm start
```

Then point browser to: [http://localhost:3000](http://localhost:3000)

## Demo skeleton

Hello world demo:

```javascript
import { setPixel, rand, SCREEN_WIDTH, SCREEN_HEIGHT } from 'engine';

/**
 * Initialization function. Called by the framework once before the first draw() call.
 */
function start() {
  // Make the screen grey
  for (let x = 0; x < SCREEN_WIDTH; x++) {
    for (let y = 0; y < SCREEN_WIDTH; y++) {
      setPixel(x, y, 60, 60, 60);
    }
  }
}

/**
 * Game loop function. Called by the framework 30 or 60 times per second when the demo is running.
 * @param {number} ts - Current relative time.
 * @param {string[]} keys - Array of keys pressed after the previous draw() call.
 * @param {number} mouseX - Current mouse pointer X coordinate.
 * @param {number} mouseY - Current mouse pointer Y coordinate.
 * @param {boolean} mouseClick - Mouse click has happened after the previous draw() call.
 * @param {boolean} mouseDown - Right mouse button is currently down.
 */
function draw(ts, keys, mouseX, mouseY, mouseClick, mouseDown) {
  // Draw random color pixel to random coordinate
  setPixel(rand(SCREEN_WIDTH - 1), rand(SCREEN_HEIGHT - 1), rand(255), rand(255), rand(255));
}

/**
 * Required metadata for the player
 * @namespace
 * @property {string} name - User visible name of the demo.
 * @property {string} author - Name and email of the demo author.
 */
const meta = {
  name: 'Hello world',
  author: 'Ilkka Oksanen <iao@iki.fi>'
};

export { start, draw, meta };
```
