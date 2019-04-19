// 参考 https://github.com/ruanyf/es6tutorial/blob/29abe06a96/docs/decorator.md
// 装饰器其实就是高阶函数的语法糖，在项目中使用需要特定的 装饰器 解析插件，如: "@babel/plugin-proposal-decorators" 和 "@babel/plugin-proposal-class-properties"
// 用法：

// 装饰类

function hoc(target) {
  target.writtable = false;
  return target;
}

@hoc
class A { }

// 装饰属性方法
// 相当于 Object.defineProperty(A.prototype, name, descriptor);

function hoc(prototype, name, descriptor) {
  // prototype ：类的原型，name：属性方法名，descriptor：描述对象 { value: function(){}, writtable:true,...}
  return descriptor;
}

class A {

  @hoc
  get() {

  }
}