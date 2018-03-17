'use strict';

const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const compress = require('koa-compress');
const print = require('./print');

const PORT = 3000;
const distDir = path.resolve(__dirname, '..', 'dist');
const compiledMode = fs.existsSync(distDir);
const files = {};
let firstRound = true;

function renderTemplate() {
  let template = fs.readFileSync(path.resolve(__dirname, 'templates', 'index.html'), 'utf8');

  const scriptFile = compiledMode ? JSON.parse(files['manifest.json']).main : 'main.js';
  const script = `<script src="/${scriptFile}"></script>`;
  const liveReload = compiledMode ? '' : '<script src="http://localhost:35729/livereload.js"></script>';

  template = template.replace(/{{live_reload}}/, liveReload);
  template = template.replace(/{{load_bundle}}/, script);

  return template;
}

function startServer() {
  files['index.html'] = renderTemplate();

  const app = new Koa();

  app.use(compress());

  app.use(async ctx => {
    let cacheHeader = 'no-cache, no-store, must-revalidate';

    let page = ctx.path.substring(1);
    page = files[page] ? page : 'index.html';

    ctx.body = files[page];

    if (compiledMode && page !== 'index.html') {
      cacheHeader = 'public, max-age=31536000'; // 1 year
    } else if (compiledMode) {
      cacheHeader = 'public, max-age=1200'; // 20 minutes
    }

    ctx.response.set('Cache-Control', cacheHeader);
  });

  app.listen(PORT);

  print.info(`Web server now running at: http://localhost:${PORT}/`);
}

exports.start = function start(options) {
  if (compiledMode) {
    print.info('Detected /dist directory. Serving built version.');

    const dir = fs.readdirSync(distDir);
    dir.forEach(file => {
      files[file] = fs.readFileSync(path.resolve(distDir, file), 'utf8');
    });

    startServer();
  } else {
    const compiler = require('./compiler');
    const MemoryFS = require('memory-fs');

    const memFs = new MemoryFS();

    compiler.watch(
      memFs,
      options,
      () => {
        print.info('Building the front-end app...');
      },
      stats => {
        print.info(`Built the frontend-app successfully in ${stats.endTime - stats.startTime}ms`);

        const dir = memFs.readdirSync(distDir);
        dir.forEach(file => {
          files[file] = memFs.readFileSync(path.resolve(distDir, file), 'utf8');
        });

        if (firstRound) {
          startServer();
          firstRound = false;
        }
      }
    );
  }
};
