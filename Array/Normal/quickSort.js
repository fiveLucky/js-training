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