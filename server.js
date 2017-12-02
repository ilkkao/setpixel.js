const fs = require('fs');
const Koa = require('koa');
const send = require('koa-send');

const app = new Koa();

app.use(async (ctx) => {
  await send(ctx, ctx.path, { index: 'index.html', root: __dirname + '/platform/player' });
});

app.listen(3000);
