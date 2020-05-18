/**
 * @tittle  防抖
 * @description 只在延时指定时间后执行最最后一次
 * @detail  1、立即执行 2、执行最后一次
 */

function debounce(fn, delay = 300) {
  var timer = null;

  return function (...arg) {
    clearTimeout(timer);
    // 在每个延时周期的开始立即执行
    if (!timer) {
      fn.apply(this, arg);
    }
    timer = setTimeout(() => {
      fn.apply(this, arg);
      // 这里是关键
      timer = null;
    }, delay);
  };
}
