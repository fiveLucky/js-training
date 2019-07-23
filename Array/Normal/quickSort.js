/**
 * 快速排序
 */

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const index = Math.floor(arr.length / 2);
  // 得到一个基准值，最好是中间值
  const base = arr[index];
  let left = [];
  let right = [];

  // 遍历数组
  arr.forEach(item => {
    if (item < base) {
      left.push(item);
    }
    if (item > base) {
      right.push(item);
    }
  });

  // 递归循环
  return quickSort(left).concat(base, quickSort(right))
}


// test

var arr = [23, 56, 77, 4, 45, 24, 29, 54];

quickSort(arr)




// 问题: 获取第 n 层的节点
// 扩展: 顺序获取第 0 - n 层的节点，并依次装入数组
// var s = {
//   a1: {
//     b1: { c1: 1 },
//     b2: { c2: 1 }
//   }
// };
// 则第 0 - 2 层的节点依次为: a1
// b1、b2
// c1、c2
// 要求返回结果为
// [['a1'], ['b1', 'b2'], ['c1', 'c2']]

function isObject(param) {
  return Object.prorotype.toString.call(param) === '[object Object]';
}

function getNode(data) {
  if (!isObject(data)) {
    return data;
  }
  let stashArr = [].concat(data);

  stashArr.reduce((pre, cur) => {
    const nextData = Object.keys(cur).map(k => cur[k]);
    if (isObject())


      return pre.push(Object.keys(cur))
  }, [])


}