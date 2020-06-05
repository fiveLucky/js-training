// 1、 尽可能多的写出判断数组的方法

var arr = [];

Array.isArray(arr);

arr.__proto__ === Array.prototype;

arr.constructor === Array;

Object.prototype.toString.call(arr) === "[object Array]";

// 2、有这样⼀个函数A，要求在不改变原有函数A功能以及调⽤⽅式的情况下，使得
// 每次调⽤该函数都能在控制台中打印出'HelloWorld'(尽可能多的实现逻辑思路)

function printOtherText() {
  const console = {
    log: function () {
      window.console.log("HelloWorld");
    },
  };
  function A() {
    console.log("调⽤了函数A");
  }
  A();
}
printOtherText();

// 3.实现⼀个深复制函数extend()

const isObject = (target) => target !== null && typeof target === "object";

function extend(source) {
  if (!isObject(source)) {
    return source;
  }

  let target = Array.isArray(source) ? [] : {};
  for (let k in source) {
    if (source.hasOwnProperty(k)) {
      target[k] = extend(source[k]);
    }
  }
  return target;
}

// 4、在浏览器中执⾏以下代码，请输出打印结果
console.log("start");
setTimeout(() => {
  console.log("children2");
  Promise.resolve().then(() => {
    console.log("children3");
  });
}, 0);
new Promise(function (resolve, reject) {
  console.log("children4");
  setTimeout(function () {
    console.log("children5");
    resolve("children6");
  }, 0);
}).then((res) => {
  console.log("children7");
  setTimeout(() => {
    console.log(res);
  }, 0);
});

// start => children4 => children2 => children3 => children5 => children7 => children6

// 5、(算法) 输⼊⼀个整数，输出该数⼆进制表示中1的个数？

function printNumCount(int) {
  return int.toString(2).match(/1/g).length;
}

// 6、 javascript 给定⼀⼀个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是
// 否有效. 有效字符串需满⾜:
// 1. 左括号必须⽤相同类型的右括号闭合。
// 2. 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。
// 示例1: 输⼊: "()" 输出: true
// 示例2: 输⼊: "()[]{}" 输出: true
// 示例3: 输⼊: "(]" 输出: false
// 示例4: 输⼊: "([)]" 输出: false
// 示例5: 输⼊: "{[]}" 输出: true

function check(str) {
  var stack = [];
  var templateStr = "({[]})";
  var index = -1;

  for (var i = 0; i < str.length; i++) {
    var item = str[i];
    if ((index = templateStr.indexOf(item)) < 3) {
      stack.push(item);
    } else {
      var target = stack.pop();
      if (!target) {
        return false;
      }
      if (target !== templateStr.charAt(5 - index)) {
        return false;
      }
    }
  }
  if (stack.length) {
    return false;
  }
  return true;
}
