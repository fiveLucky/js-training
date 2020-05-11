// 简易版实现，并未考虑其他复杂情况

/**
 * 实现 call 方法
 * 分析：fn.call 过程
 *  1、fn 的 this 指向改变了
 *  2、fn 执行了，可能有返回值
 *  3、call 支持传参，数量不限
 */

Function.prototype.myCall = function (context, ...arg) {
  const target = context || window;
  // 改变 fn 的 this
  target.__fn = this;
  // 执行 传参
  const result = target.__fn(...arg);
  // 删除
  delete target.__fn;
  // 返回值
  return result;
};

// 不使用 es6 语法
Function.prototype.myCall = function (context) {
  var target = context || window;
  // 改变 fn 的 this
  target.__fn = this;
  var result,
    arg = [];
  // 拼接 eval 所需要的参数
  for (let index = 1; index < arguments.length; index++) {
    arg.push("arguments[" + index + "]");
  }
  // 执行 传参
  result = eval("target.__fn(" + arg + ")");
  // 删除
  delete target.__fn;
  // 返回值
  return result;
};

/**
 * 实现 apply 方法
 * 分析：fn.apply 过程
 *  1、fn 的 this 指向改变了
 *  2、fn 执行了
 *  3、apply 支持传参，参数是数组
 */

Function.prototype.myApply = function (context, arg) {
  const target = context || window;
  // 改变 fn 的 this
  target.__fn = this;
  // 执行 传参
  const result = target.__fn(arg);
  // 删除
  delete target.__fn;
  // 返回值
  return result;
};

// 不使用 es6 语法
Function.prototype.myApply = function (context, arr) {
  var target = context || window;
  // 改变 fn 的 this
  target.__fn = this;

  var result,
    arg = [];

  for (var index = 0; index < arr.length; index++) {
    arg.push("arr[" + index + "]");
  }

  // 执行 传参
  result = eval("target.__fn(" + arg + ")");
  // 删除
  delete target.__fn;
  // 返回值
  return result;
};

/**
 * 实现 bind 方法
 * 分析：fn.bind 过程
 *  1、fn 的 this 指向改变了
 *  2、fn  没有执行
 *  3、bind 支持传参，参数数量不限
 *  4、返回一个函数，可能有返回值
 *  5、new 的时候 this 指向绑定失效
 */

Function.prototype.myBind = function (context) {
  var target = context || window;
  // 改变 fn 的 this
  var self = this;
  var arg = Array.prototype.slice.call(arguments, 1);

  // 中间函数 继承 原型
  function Middle() {}
  // 返回函数
  function bind() {
    var curArg = Array.prototype.slice.call(arguments, 0);
    // 执行 传参
    var result = self.apply(Middle.prototype.isPrototypeOf(this) ? this : target, arg.concat(curArg));
    // 返回值
    return result;
  }
  Middle.prototype = this.prototype;

  bind.prototype = new Middle();

  return bind;
};

// test

var obj = {
  value: 1,
  label: "index",
};

function getValue(desc) {
  return {
    value: this.value,
    label: this.label,
    desc,
  };
}

var A = getValue.myBind(obj, "测试");

var a = new A();

console.log(a);

// getValue.myCall(obj, "测试");
// getValue.myApply(obj, "测试");
