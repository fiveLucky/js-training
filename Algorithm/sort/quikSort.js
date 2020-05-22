/**
 * @tittle  快速排序
 * @description 选一个中间值，循环数组与这个中间值比较，比这个中间值小的放在左边，大的放右边。然后分别对左边数组和右边数组继续进行如此处理，最后合并所有数组，得到一个有序数组
 * @complexity  log(n)
 */

function quickSort(array) {
  const l = array.length;
  if (l < 2) {
    return array;
  }
  const midItem = array[Math.floor(l / 2)];
  let leftArr = [];
  let rightArr = [];

  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (item > midItem) {
      rightArr.push(item);
    }
    if (item < midItem) {
      leftArr.push(item);
    }
  }

  return quickSort(leftArr).concat(midItem, quickSort(rightArr));
}

// test

var arr = [1, 6, 3, 8, 4, 2, 7, 5];

var result = quickSort(arr);

console.log(result);
