// 原生 webSocket api，不能指定消息通道
// var ws = new WebSocket("wss://echo.websocket.org");

// ws.onopen = function (evt) {
//   console.log("Connection open ...");
//   ws.send("Hello WebSockets!");
// };

// ws.onmessage = function (evt) {
//   console.log("Received Message: " + evt.data);
//   ws.close();
// };

// ws.onclose = function (evt) {
//   console.log("Connection closed.");
// };

export default function ws() {
  // socket.io
  // const socket = window.io("/test");
  // socket.on("time", (data) => {
  //   console.log("client receive server's time:" + data);
  // });
  // socket.on("room1", (data) => {
  //   console.log("room1:" + data);
  // });
  // socket.emit("time", Date.now());
  const btn = document.getElementById("btn");
  // btn.onclick = sendMsg;
  // function sendMsg() {
  //   console.log("send msg");
  //   socket.emit("time", Date.now());
  // }
  const room = window.io("/chat-room");
  room.on("room1", (data) => {
    console.log("room receive server's time:" + data);
  });
  room.on("room2", (data) => {
    console.log("room2 receive server's time:" + data);
  });
  console.log(room);
  btn.onclick = sendMsg;
  function sendMsg() {
    console.log("send msg");
    room.emit("room1", Date.now());
    room.emit("room2", Date.now());
  }
}
