/**
 * @tittle  归并排序
 * @description 将数组不断一分为二，然后两两排序后重组
 * @process
 *
 *    [   5     8     7     4      3      6     2     1    ]

        [ 5     8     7     4 ]  [ 3      6     2     1 ]

          [ 5  8 ]    [ 7  4 ]     [ 3  6 ]    [ 2  1 ]

            [5] [8]    [7] [4]     [3]  [6]    [2] [1]

          [ 5  8 ]    [ 4  7 ]     [ 3  6 ]    [ 1  2 ]
        
        [ 4     5     7     8 ]  [ 1     2     3     6 ]

      [   1     2     3      4      5      6     7     8    ]

 *
 */

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }

  // 分解
  const midIndex = Math.floor(array.length / 2);
  const left = array.slice(0, midIndex);
  const right = array.slice(midIndex);

  // 递归分解，排序，组合
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const stashData = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      stashData.push(left.shift());
    } else {
      stashData.push(right.shift());
    }
  }
  // 总会有一个数组先空，剩下的数组项就直接合并进去
  return stashData.concat(left, right);
}

// test

var arr = [4, 7, 2, 8, 3, 5, 6, 1];

var result = mergeSort(arr);

console.log(result);
