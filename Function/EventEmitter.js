/**
 * @knowledge 观察者模式 OR 发布·订阅模式
 *
 * @description 相同点：二者都是 注册-监听 机制
 *              不同点：前者一对一，后者一对多
 *              其实完全可以当做一个东西理解，后者其实可以理解为实前者的加强版
 * @example 原生DOM事件，Vue 里的 bus 通讯方式
 */

function EventEmitter() {
  this.events = {};
  this.maxListenerNum = 10;
}

EventEmitter.prototype.addEventListener = function (name, listener) {
  var events = this.events[name];
  if (events) {
    if (events.length === this.maxListenerNum) {
      throw new Error("监听器数量超限");
    }
    events.push(listener);
  } else {
    events = [listener];
  }
};

EventEmitter.prototype.addEventListenerOnce = function (name, listener) {
  var only = (...arg) => {
    listener.apply(this, arg);
    this.removeEventListener(name, listener);
  };
  only.fn = listener;

  this.addEventListener(name, only);
};

EventEmitter.prototype.removeEventListener = function (name, listener) {
  var events = this.events[name];
  if (events) {
    if (listener) {
      events = events.filter((l) => l !== listener && l.fn !== listener);
    } else {
      delete this.events[name];
    }
  }
};

EventEmitter.prototype.attachEventListener = function (name, ...arg) {
  var events = this.events[name];
  var l = 0;
  if (events) {
    while (l < events.length) {
      events[l].apply(this, arg);
      l++;
    }
  }
};

EventEmitter.prototype.setMaxListenersNum = function (num) {
  this.maxListenerNum = num;
};
