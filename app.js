const Koa = require("koa");
const app = new Koa();
const koaStatic = require("koa-static");

const fs = require("fs");
const exec = require("child_process").exec;

const http = require("http");

const server = http.Server(app.callback());

const socketServer = require("./Server/socketServer.js");

const menu = require("./Server/menuMD.js");

// 第一种方式：使用koa-static中间件
app.use(koaStatic(__dirname, { defer: true }));

app.use(async (ctx, next) => {
  // 设置 service worker scope 范围
  ctx.append("Service-Worker-Allowed", ["/"]);
  await next();
});

app.use(menu);

app.use(async (ctx, next) => {
  console.log(ctx.url);
  await next();
});

// 第二种方式：设置响应
// app.use((ctx) => {
//   console.log(ctx.url);
//   const typeMap = {
//     js: "text/javascript",
//   };
//   ctx.type = typeMap[ctx.url.split(".").pop()] || "text/html";
//   if (ctx.url === "/") ctx.url = "/index.html";
//   ctx.body = fs.readFileSync(__dirname + ctx.url, "utf8");
// });

server.listen(4000, () => {
  console.log("listening port 4000");
  // 打开默认浏览器
  // exec(" open http://localhost:4000")
});

// webSocket
socketServer(server);
