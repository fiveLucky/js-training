const Koa = require("koa");
const app = new Koa();
const koaStatic = require("koa-static");

const fs = require("fs");
const exec = require("child_process").exec;

// 第一种方式：使用koa-static中间件
app.use(koaStatic(__dirname));

// 第二种方式：设置响应
// app.use(ctx => {
//   console.log(ctx.url)
//   const typeMap = {
//     'js': 'text/javascript',
//   }
//   ctx.type = typeMap[ctx.url.split('.').pop()] || 'text/html';
//   if (ctx.url === '/') ctx.url = '/index.html';
//   ctx.body = fs.readFileSync(__dirname + ctx.url, 'utf8');
// })

app.listen(4000);

console.log("listening port 4000");
// 打开默认浏览器
// exec(" open http://localhost:4000")
// exec(" open http://localhost:4000")
// 打开默认浏览器
// exec(" open http://localhost:4000")
// 打开默认浏览器
// exec(" open http://localhost:4000")
// exec(" open http://localhost:4000")
// 打开默认浏览器
// exec(" open http://localhost:4000")
// 打开默认浏览器
// exec(" open http://localhost:4000")
