module.exports = function (server) {
  // 使用socket.io
  const socket = require("socket.io")(server);
  // const test = socket.of("/test");
  // test.on("connection", (s) => {
  //   console.log("webSocket connected");
  //   s.on("time", (data) => {
  //     console.log("server receive your time:" + data);
  //     s.emit("time", "我这里的时间是：" + Date.now());
  //   });
  // });

  // 创建一个namespace，也就是一个url
  const chat = socket.of("/chat-room");

  chat.on("connection", (c) => {
    c.emit();
    console.log("chat connected");
    // 创建一多个room，只是在服务端有感知，客户端并不知道
    c.join("room");
    c.join("chat");
    const room1 = chat.to("room");
    // 每个room下又可以有多个事件
    c.on("room1", (data) => {
      console.log("room", data);
      room1.emit("room1", "come in room1");
    });
    const room2 = chat.to("chat");
    // 监听
    c.on("room2", (data) => {
      console.log("room2", data);
      room2.emit("room2", "come in room2");
    });
  });
};

// 总结：
// 命名空间可以有多个，每个命名空间下又可以有多个room，每个room下又可以有多个事件，消息通道分类管理
// room 只在服务端有概念，例如聊天，其实就是一个room下多个event
// 客户端只监听当前event，服务器会根据客户端指定的房间send消息
