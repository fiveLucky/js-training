/**
 * 原型链
 * 图示：
 * 
 *                     Person.prototype
+--------------+                               +---------------+
|              +---------------------------->  |               |
|    Person    |                               |   prototype   |
|              |  <----------------------------+               |
+------+-------+       prototype.constructor   +---------+-----+
       |                                                 |
       |                                              ^  |
    new|                                              |  |
       |                                              |  |
       |                                              |  | __proto__
       v                                              |  |
                                                      |  |
+--------------+                                      |  |
|              |         person.__proto__             |  |
|  person      | +------------------------------------+  |
|              |                                         |
+--------------+                                         |
                                                         |
                                                         |
                      Object.prototype                   v
+--------------+                               +---------+------+
|              | +---------------------------> |                |
|  Object      |                               |   prototype    |
|              | <---------------------------+ |                |
+--------------+                               +--------+-------+
                      prototype.constructor             |
                                                        |
                                                        | __proto__
                                                        |
                                                        |
                                                        v

                                                       null

 */

// 代码测试

function Person(param) {
  Object.assign(this, param)
}

Person.prototype.getName = function () {
  console.log(this.name)
}

var nextPerson = new Person({ name: 'Jack', age: 30 });



console.log(nextPerson) // nexttPerson 实例
console.log(nextPerson.__proto__) // Person.prototype
console.log(nextPerson.__proto__.__proto__) // Object.prototype
console.log(nextPerson.__proto__.__proto__.__proto__) // null


/**
 * 实例上找不到的属性和方法都会去原型上找
 * 而且可以修改
 * 
 *  */

function Man() {
  this.name = 'jack';
  this.age = 30;
}

Man.prototype.getName = function () {
  return this.name;
}
Man.prototype.getMsg = function () {
  // 可以访问构造函数
  return this.constructor.otherMsg;
}

Man.otherMsg = 'this is a very strong man';

var person = new Man();

console.log(person.getMsg())
console.log(person.getName())

// 实例修改构造函数的属性 两种方式
// 手动访问原型的构造函数属性
person.__proto__.constructor.otherMsg = 'hhh';
// 这种方式是自动访问原型了
person.constructor.otherMsg = null;


console.log(person.getMsg())









