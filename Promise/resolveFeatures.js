function red() {
  console.log('red')
}
function blue() {
  console.log('blue')
}
function green() {
  console.log('green')
}

const light = (time, cb) => new Promise((resolve, reject) => {
  setTimeout(() => {
    cb();
    resolve()
  }, time)
})

const step = () => {
  Promise.resolve()
    .then(() => light(3000, red))
    .then(() => light(2000, blue))
    .then(() => light(1000, green))
    .then(step)
}

// then 里面返回的 value is thenable，promsie的状态会follow value 的状态


// 头条面试题

var p = new Pipe()
p.next(3000, () => { console.log('a'); })
  .next(2000, () => { console.log('b'); })
  .next(1000, () => { console.log('c'); });
p.start();

// 使用方式如上例，要求在3秒后输出 a，5秒后输出 b，6秒后输出 c，请实现 Pipe


class Pipe {
  constructor() {
    this.queue = [];
  }

  next(time, cb) {
    this.queue.push(() => new Promise(resolve => {
      setTimeout(() => {
        cb();
        resolve();
      }, time)
    }));
    return this;
  }
  start() {
    this.queue.reduce((pre, cur) => {
      return pre.then(cur)
    }, Promise.resolve())
  }
}