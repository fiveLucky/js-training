/**
 * @description 实现一个水印插件，支持页面、图片增加水印
 */

var waterMark = {

  pageMark: function () {
    // 创建canvas元素
    var canvas = document.createElement('canvas');
    var width = 100;
    var height = 100;
    canvas.width = `${width}`;
    canvas.height = `${height}`;

    var ctx = canvas.getContext('2d');
    ctx.font = "16px Microsoft YaHei";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.translate(50, 50);
    ctx.rotate(-45 * Math.PI / 180);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
    var name = /user_name=([^;]+)/.exec(document.cookie)[1]
    var nameLength = Math.ceil(ctx.measureText(name).width);
    ctx.fillText(name, 0, 0);


    var container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.bottom = '0';
    container.style.right = '0';
    container.style.zIndex = '999';
    container.style.pointerEvents = 'none';
    container.style.backgroundImage = 'url("' + ctx.canvas.toDataURL() + '")';

    document.body.appendChild(canvas);
    document.body.appendChild(container);
  }

  pictureMark: function (url) {
    var img = new Image();

    img.src = url;
    img.width = '100%';
    img.height = '100%';
    img.onload = function () {
      // 创建canvas
      var canvas = document.createElement('canvas');
      canvas.width = '200';
      canvas.hight = '200';
      var ctx = canvas.getContext('2d');
      // 画图片
      // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      ctx.drawImage(img, 0, 0)
    }
  }



}