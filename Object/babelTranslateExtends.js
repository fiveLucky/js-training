/**
 * 学完继承，分析一下babel对extends的实现，其实就是寄生组合式继承
 */

//  es6 代码

class A {}
class B extends A {}

// 下面看一下babel转译后的代码 

"use strict";

/* eslint-disable */

// 判断类型
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
// 判断是不是可用的constructor
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

// 获取原型
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

// 核心代码，继承的实现
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  // 原型继承 + 寄生继承
  // 构建了原型链，重新指向构造函数
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  // subClass.__proto__ = superClass，这里更改SubClass的原型，指向SuperClass，为了下面apply
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var A = function A() {
  _classCallCheck(this, A);
};


var B =
  /*#__PURE__*/
  function (_A) {
    _inherits(B, _A);

    function B() {
      _classCallCheck(this, B);

      // 这行代码是干了啥，其实就是 SuperClass.aplly(this)，上面把SubClass的原型指向了SuperClass，但是为什么要绕这么一圈呢？直接 _A.apply(this,arguments)不行吗？
      return _possibleConstructorReturn(this, _getPrototypeOf(B).apply(this, arguments));
    }

    return B;
  }(A);