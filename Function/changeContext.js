
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
  return result

}


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
  return result

}

/**
 * 实现 bind 方法
 * 分析：fn.bind 过程
 *  1、fn 的 this 指向改变了
 *  2、fn  没有执行
 *  3、bind 支持传参，参数数量不限
 *  4、返回一个函数，可能有返回值
 */

Function.prototype.myBind = function (context, ...arg) {
  const target = context || window;
  // 改变 fn 的 this
  target.__fn = this;
  // 返回函数
  return function () {
    // 执行 传参
    const result = target.__fn(...arg);
    // 删除
    delete target.__fn;
    // 返回值
    return result;
  }

}




// test

var obj = {
  value: 1,
  label: 'index'
}

function getValue(desc) {
  return {
    value: this.value,
    label: this.label,
    desc,
  }
}

getValue.myCall(obj, '测试')
getValue.myApply(obj, '测试')
getValue.myBind(obj, '测试')()
