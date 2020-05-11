/**
 * 模拟实现 new 操作符
 * 分析：new 操作符做了什么？
 *  1、生成一个新对象
 *  2、执行原型链接
 *  3、目标函数被执行，绑定this
 *  4、返回新对象/构造函数返回的对象
 *
 */

function myNew(func, ...arg) {
  // 创建对象
  var target = {};
  // 执行原型链接
  target.__proto__ = func.prototype;
  // 执行函数，绑定this,
  const result = func.call(target, ...arg);
  // 判断返回值类型
  if (result && (typeof result === "object" || typeof result === "function")) {
    return result;
  }
  return target;
}

// test

function A(desc) {
  this.a = "a";
  this.desc = desc;
}
A.prototype.getA = function () {
  return this.a;
};

myNew(A);
new A();
