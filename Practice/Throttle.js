/**
 * @tittle  Throttle
 * @description 节流，每隔固定时间执行一次
 * @detail  1、立即执行 2、延后执行 3、第一次和最后一次都执行
 */

//  只执行第一次
function throttle1(fn, delay = 300) {
  var time = 0;
  return function (...arg) {
    if (Date.now() - time > delay) {
      fn.apply(this, arg);
      time = Date.now();
    }
  };
}

// 只执行最后一次
function throttle2(fn, delay = 300) {
  var timer = null;
  return function (...arg) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, arg);
      }, delay);
    }
  };
}

// 都执行
function throttle3(fn, delay = 300) {
  // 定时器句柄
  var timer = null,
    // 时间打点
    time = 0,
    resetFlag = function () {
      // 触发过一次，就重置时间打点
      time = Date.now();
      timer = null;
    };

  return function (...arg) {
    // 距离延时结束还剩多长时间
    var duration = Date.now() - time;
    // 已经间隔了 >= delay的时间
    if (duration > delay) {
      //清楚定时器任务
      clearTimeout(timer);
      resetFlag();
      fn.apply(this, arg);
    } else if (!timer) {
      var remaining = delay - duration;
      // 重新开启定时器任务
      timer = setTimeout(() => {
        resetFlag();
        fn.apply(this, arg);
      }, remaining);
    }
  };
}
