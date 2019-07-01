/**
 * 继承：通过原型让一个引用类型继承另一个引用类型的属性和方法
 */

/**
 * 原型链继承
 *
 * 解析：顾名思义，把函数的原型指向另一个函数的实例，
 * 
 * 特点：函数的原型拥有了另一个实例的所有属性和方法
 * 缺点：继承的属性和方法被所有实例共享
 */

function Super() {
  this.name = 'Super';
  this.role = 'father';
}
Super.prototype.getName = function () {
  return this.name;
}

function Suber() { }

Suber.prototype = new Super()

var sub = new Suber()

sub.getName() // 通过__proto__一层一层向上查找，输出 Super


/**
 * 借用构造函数（经典模式）
 *
 * 解析：将一个构造函数在另一个构造函数内 call 执行
 * 
 * 特点：每个实例继承的属性互不影响
 * 缺点：1、只能继承私有属性，不能继承原型上的属性和方法
 *      2、都在构造函数内定义，每次实例化都要重新创建一次
 */

function Super1() {
  this.name = 'Super';
  this.role = 'father';
}
Super1.prototype.getName = function () {
  return this.name;
}

function Suber1() {
  Super.call(this);
}


var sub1 = new Suber1()
sub1.name = 'sub1'


var sub2 = new Suber1();

sub2.name = 'sub2';

// 互不干扰，name为各自的值
console.log(sub1)
console.log(sub2)


sub1.getName() // sub1实例和原型链上都没有这个方法，输出 TypeError 


/**
 * 组合继承（构造函数+原型链）
 * 
 * 解析：融合两种继承方法
 * 
 * 特点：既继承了私有属性，又继承了原型方法
 * 缺点：1、都在构造函数内定义，每次实例化都要重新创建一次
 *      2、原型上多了一份私有属性
 */


function Super2() {
  this.name = 'Super';
  this.role = 'father';
}
Super2.prototype.getName = function () {
  return this.name;
}

function Suber2() {
  Super.call(this);
}

Suber2.prototype = new Super2();

var sub3 = new Suber2()
sub3.name = 'sub3'


var sub4 = new Suber2();

sub4.name = 'sub4';

// 互不干扰，name为各自的值，可以看到原型上多了一份实例属性
console.log(sub3)
console.log(sub4)


sub3.getName() // sub1实例和原型链上都没有这个方法，输出 TypeError 


/**
 * 原型式继承
 * 
 * 解析：这与Object.create()实现是一样的
 * 优缺点：和原型链继承一样
 */

function createObj(o) {
  function F() { }
  F.prototype = o;
  return new F();
}

var person = {
  name: 'kevin',
  friends: ['daisy', 'kelly']
}

var person1 = createObj(person);
var person2 = createObj(person);

// 增加实例属性
person1.name = 'person1';
console.log(person2.name); // kevin

person1.firends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]


/**
 * 寄生式继承
 *
 * 解析：创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
 *      就是在原型式继承基础上，对实例做了增强，然后返回
 * 缺点：缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
 */

function createObj1(o) {
  var clone = Object.create(o);
  clone.sayName = function () {
    console.log('hi');
  }
  return clone;
}

createObj1({
  name: 'jisheng'
})


/**
 * 寄生组合式继承（终极方案）
 *
 * 解析：寄生模式+构造函数模式+原型链模式
 * 特点：1、继承了私有属性
 *      2、继承了原型方法
 *      3、保持了原型的纯净
 *      4、形成了原型链
 * 
 * 使用场景：extends关键字
 */


function SuperClass() {
  this.name = 'SuperClass';
  this.desc = 'parent'
}

SuperClass.prototype.getName = function () {
  return this.name;
}

function SubClass() {
  SuperClass.call(this)
}

// 创造一个干净的原型指针
function Middle() { }
Middle.prototype = SuperClass.prototype;

// 得到干净的原型，并且形成原型链
// SubClass.prototype = new Middle();
// 这种方式也可以
// SubClass.prototype.__proto__ = SuperClass.prototype;
// 或者
SubClass.prototype = Object.create(SuperClass.prototype)

// 修正constructor指向
SubClass.prototype.constructor = SubClass;

var result = new SubClass()
console.log(result)