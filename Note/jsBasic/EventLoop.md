# EventLoop

## 浏览器环境

先看代码：

```js
setTimeout(() => {
  console.log("timeout1");

  Promise.resolve().then(() => {
    console.log("promise1");
    Promise.resolve().then(() => {
      console.log("promise2");
      Promise.resolve().then(() => {
        console.log("promise3");
      });
    });
  });
}, 0);

setTimeout(() => {
  console.log("timeout2");
  setTimeout(() => {
    console.log("timeout3");
    Promise.resolve().then(() => {
      console.log("promise4");
    });
  }, 0);
}, 0);
```

输出：timeout1 => promise1 => promise2 => promise3 => timeout2 => timeout3 => promise4

### 浏览器里的 EventLoop 原理：

- 执行栈执行 script 代码，遇到异步任务就判断任务类型，microtask 就放到微任务队列，macrotask 就放到宏任务队列。
- 当执行栈空了，就会先检查微任务队列如果不为空，则会顺序执行**整个微任务队列（包括微任务中创建的微任务）**，直到微任务队列为空。
- 然后检查宏任务队列如果不为空，则会取出**一个**宏任务，执行完该任务，会再去检查微任务，重复上一步的逻辑。
- 当所有的队列都空了，会继续按照 执行栈 => 微任务 => 宏任务

**NOTE**：对于定时任务 setTimeout & setInterval，浏览器遇到定时任务时，会先交给 timer 模块，timer 会计算时间，等到设定的时间结束后，才会把 callback 放到宏任务队列，然后被 EventLoop 捕获执行。

## Node 环境

同样的代码：

```js
setTimeout(() => {
  console.log("timeout1");

  Promise.resolve().then(() => {
    console.log("promise1");
    Promise.resolve().then(() => {
      console.log("promise2");
      Promise.resolve().then(() => {
        console.log("promise3");
      });
    });
  });
}, 0);

setTimeout(() => {
  console.log("timeout2");
  setTimeout(() => {
    console.log("timeout3");
    Promise.resolve().then(() => {
      console.log("promise4");
    });
  }, 0);
}, 0);
```

输出：

- Node version 11+ 保持和浏览器一致：
  timeout1 => promise1 => promise2 => promise3 => timeout2 => timeout3 => promise4
- Node version < 11：
  会存在不确定性，会有两种输出：
  - 和浏览器一样：timeout1 => promise1 => promise2 => promise3 => timeout2 => timeout3 => promise4
  - 出现差异：timeout1 => timeout2 => promise1 => promise2 => promise3 => => timeout3 => promise4

### Node EventLoop 原理：

Node 环境会有如下几个阶段：

- timers 阶段：这个阶段执行 timer（setTimeout、setInterval）的回调
- I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
- idle, prepare 阶段：仅 node 内部使用
- poll 阶段：获取新的 I/O 事件, 适当的条件下 node 将阻塞在这里
- check 阶段：执行 setImmediate() 的回调
- close callbacks 阶段：执行 socket 的 close 事件回调

由于 Node 环境下定时器任务会放在 timers 阶段同步执行，而微任务则会在每个阶段执行完之后才会被执行，当然这种机制只是在 Node 版本在 11 之前，11 和 11 之后的版本里，有了新的变化。

### 有几点需要区分一下：

1. setTimeout 和 setImmediate

```js
setTimeout(function timeout() {
  console.log("timeout");
}, 0);
setImmediate(function immediate() {
  console.log("immediate");
});
```

- 一般情况下，这两个输出不稳定，如果时间循环准备时间小于 1ms，则会先执行 setImmediate，否则先执行 setTimeout。
- 但当二者在异步 i/o callback 内部调用时，总是先执行 setImmediate，再执行 setTimeout

2. process.nextTick

```js
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);
process.nextTick(() => {
  console.log("nextTick");
  process.nextTick(() => {
    console.log("nextTick");
    process.nextTick(() => {
      console.log("nextTick");
      process.nextTick(() => {
        console.log("nextTick");
      });
    });
  });
});
// nextTick=>nextTick=>nextTick=>nextTick=>timer1=>promise1
```

这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行。

## 总结

浏览器和 Node 环境下，microtask 任务队列的执行时机不同

- Node 端，microtask 在事件循环的各个阶段之间执行
- 浏览器端，microtask 在事件循环的 macrotask 执行完之后执行
