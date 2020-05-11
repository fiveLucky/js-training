/**
 * instanceof 是如何判断的
 *
 * 判断两个参数是否 在同一个原型链上
 *
 */

//  eg:

function A() {}

var a = new A();

console.log(a instanceof A); // true

A.prototype = {};

console.log(a instanceof A); // false

function B() {}

B.prototype = new A();

var b = new B();

console.log(b instanceof B); // true
console.log(b instanceof A); // true
console.log(A.prototype.isPrototypeOf(b)); // true

/**
 * 实现一个 instanceof 函数
 */

function myInstanceof(targetObj, sourceObj) {
  return sourceObj.prototype.isPrototypeOf(targetObj);
}

console.log(myInstanceof(b, B), "my");
console.log(myInstanceof(b, A), "my");
