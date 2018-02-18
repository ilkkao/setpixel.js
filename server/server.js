'use strict';

const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const compress = require('koa-compress');
const MemoryFS = require('memory-fs');
const compiler = require('./compiler');

const PORT = 3000;
const distDir = path.resolve(__dirname, '..', 'dist');
const compiledMode = fs.existsSync(distDir);
const files = {};
let firstRound = true;

exports.start = function () {
  if (compiledMode) {
    console.log('Detected /dist directory. Serving built version.');

    const dir = fs.readdirSync(distDir);
    dir.forEach(file => files[file] = fs.readFileSync(path.resolve(distDir, file), 'utf8'));

    startServer();
  } else {
    const memFs = new MemoryFS();

    compiler.watch(memFs, stats => {
      console.log(`Built successfully in ${stats.endTime - stats.startTime}ms`);

      const dir = memFs.readdirSync(distDir);
      dir.forEach(file => files[file] = memFs.readFileSync(path.resolve(distDir, file), 'utf8'));

      if (firstRound) {
        startServer();
        firstRound = false;
      }
    });
  }
};

function startServer() {
  files['index.html'] = renderTemplate();

  const app = new Koa();

  app.use(compress());

  app.use(async ctx => {
    let page = ctx.path.substring(1);

    page =  page === '' ? 'index.html' : page;

    if (files[page]) {
      ctx.body = files[page];
    }

    if (compiledMode && page !== 'index.html') {
      ctx.response.set('Cache-Control', 'public, max-age=31536000');
    } else {
      ctx.response.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  });

  app.listen(PORT);

  console.log(`Server started: http://localhost:${PORT}/`); // eslint-disable-line no-console
}

function renderTemplate() {
  let template = fs.readFileSync(path.resolve(__dirname, '../engine/index.html'), 'utf8');

  const scriptFile = compiledMode ? JSON.parse(files['manifest.json'])['main'] : 'main.js';
  const script = `<script src="/${scriptFile}"></script>`;
  const liveReload = compiledMode ? '' : '<script src="http://localhost:35729/livereload.js"></script>';

  template = template.replace(/{{live_reload}}/, liveReload);
  template = template.replace(/{{load_bundle}}/, script);

  return template;
}
