/**
 * 实现一个去重方法
 */


function strip1(arr) {
  var stash = [];
  arr.forEach(k => {
    if (!stash.includes(k)) {
      stash.push(k);
    }
  });
  return stash;
}

function strip2(arr) {
  return [...new Set(arr)]
}
