module.exports = function (server) {
  // 使用socket.io
  const socket = require("socket.io")(server, {
    path: "/socket/test",
  });
  socket.on("connection", (s) => {
    console.log("webSocket connected");
    s.on("time", (data) => {
      console.log("server receive your time:" + data);
      s.emit("time", "我这里的时间是：" + Date.now());
    });
  });
};
