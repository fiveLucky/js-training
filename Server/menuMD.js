const fs = require("fs");
const path = require("path");

function appendNav() {
  let navListStr = "<ul id='nav'>";

  const htmlFileNameList = fs.readdirSync(path.resolve("./Html"));

  htmlFileNameList.forEach((name) => {
    const fileName = name.replace(".html", "");
    const li = `<li><a href='../Html/${name}'>${fileName}</a></li>`;
    navListStr += li;
  });

  navListStr += "</ul>";

  return navListStr;
}

module.exports = async function (ctx, next) {
  const { url } = ctx;
  if (url === "/" || url === "/index.html") {
    let indexHtmlContent = fs.readFileSync(path.resolve("./index.html"), "utf8");
    const ul = appendNav();
    indexHtmlContent = indexHtmlContent.replace("<!-- append nav list -->", ul);
    ctx.body = indexHtmlContent;
  }
  await next();
};
