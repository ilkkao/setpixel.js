'use strict';

const path = require('path');
const Koa = require('koa');
const compress = require('koa-compress');
const send = require('koa-send');

const PORT = 3000;

const app = new Koa();

app.use(compress());

app.use(async ctx => {
  await send(ctx, ctx.path, {
    index: 'index.html',
    root: path.resolve(__dirname, '../dist'),
    setHeaders: (res, path) => {
      res.setHeader('Cache-Control',
        // index.html or or non-fingerprinted bundle (dev-version) is never cached
        path.endsWith('index.html') || path.endsWith('bundle.js')
          ? 'no-cache, no-store, must-revalidate'
          : 'public, max-age=31536000');
    }
  });
});

app.listen(PORT);

console.log(`Server started: http://localhost:${PORT}/`); // eslint-disable-line no-console
