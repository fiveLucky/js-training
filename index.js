const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const exec = require('child_process').exec;

app.use(ctx => {
  // console.log(ctx.url)
  // const typeMap = {
  //   'js': 'text/javascript',
  //   '/': 'text/html',
  // }
  // console.log(typeMap[ctx.url.split('.').pop()])
  // ctx.type = typeMap[ctx.url.split('.').pop()];
  ctx.body = fs.readFileSync('./index.html', 'utf8');
})


app.listen(4000)

console.log('listening port 4000')

exec(" open http://localhost:4000")

