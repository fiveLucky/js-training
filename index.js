const Koa = require("koa");
const app = new Koa();
const koaStatic = require("koa-static");

const fs = require("fs");
const exec = require("child_process").exec;

function appendNav() {
  let navListStr = "<ul id='nav'>";

  const htmlFileNameList = fs.readdirSync(__dirname + "/Html");

  htmlFileNameList.forEach((name) => {
    const fileName = name.replace(".html", "");
    const li = `<li><a href='../Html/${name}'>${fileName}</a></li>`;
    navListStr += li;
  });

  navListStr += "</ul>";

  return navListStr;
}

// 第一种方式：使用koa-static中间件
app.use(koaStatic(__dirname, { defer: true }));

app.use((ctx, next) => {
  // 设置 service worker scope 范围
  ctx.append("Service-Worker-Allowed", ["/"]);
  next();
});

app.use((ctx, next) => {
  if (ctx.url === "/data") {
    const { query } = ctx;
    // if (query.id === 1) {
    ctx.type = "application/json";
    ctx.body = [1, 3, 4, 5];
    // } else {
    //   ctx.body = "no param";
    // }
  }
  next();
});

app.use((ctx, next) => {
  const { url } = ctx;
  if (url === "/" || url === "/index.html") {
    let indexHtmlContent = fs.readFileSync(__dirname + "/index.html", "utf8");
    const ul = appendNav();
    indexHtmlContent = indexHtmlContent.replace("<!-- append nav list -->", ul);
    ctx.body = indexHtmlContent;
  }
  next();
});

app.use((ctx, next) => {
  console.log(ctx.url);
  next();
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

app.listen(4000);

console.log("listening port 4000");
// 打开默认浏览器
// exec(" open http://localhost:4000")
