// The MIT License (MIT)

// Copyright (c) 2014 Tim Oxley

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// Modified from: https://github.com/timoxley/keycode/blob/master/index.js

const names = {}; // title for backward compat

const aliases = {
  windows: 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  ctl: 17,
  control: 17,
  option: 18,
  pause: 19,
  break: 19,
  caps: 20,
  return: 13,
  escape: 27,
  spc: 32,
  pgup: 33,
  pgdn: 34,
  ins: 45,
  del: 46,
  cmd: 91
};

const codes = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  'pause/break': 19,
  'caps lock': 20,
  esc: 27,
  space: 32,
  'page up': 33,
  'page down': 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  insert: 45,
  delete: 46,
  command: 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
};

// lower case chars
for (let i = 97; i < 123; i++) {
  codes[String.fromCharCode(i)] = i - 32;
}

// numbers
for (let i = 48; i < 58; i++) {
  codes[i - 48] = i;
}

// function keys
for (let i = 1; i < 13; i++) {
  codes[`f${i}`] = i + 111;
}

// numpad keys
for (let i = 0; i < 10; i++) {
  codes[`numpad ${i}`] = i + 96;
}

// Create reverse mapping
Object.keys(codes).forEach(code => {
  names[codes[code]] = code;
});

// Add aliases
Object.keys(aliases).forEach(alias => {
  codes[alias] = aliases[alias];
});

export default function(searchInput) {
  // Keyboard Events
  if (searchInput && typeof searchInput === 'object') {
    const hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode;
    if (hasKeyCode) {
      searchInput = hasKeyCode; // eslint-disable-line no-param-reassign
    }
  }

  // Numbers
  if (typeof searchInput === 'number') {
    return names[searchInput];
  }

  // Everything else (cast to string)
  const search = String(searchInput);

  // check codes
  let foundNamedKey = codes[search.toLowerCase()];
  if (foundNamedKey) {
    return foundNamedKey;
  }

  // check aliases
  foundNamedKey = aliases[search.toLowerCase()];
  if (foundNamedKey) {
    return foundNamedKey;
  }

  // weird character?
  if (search.length === 1) {
    return search.charCodeAt(0);
  }

  return undefined;
}
