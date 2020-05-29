/**
 * @tittle  随机选取 10~100 之间的 10 个不重复的整数，存入一个数组，并按从小到大顺序进行排序
 */

function constructArray() {
  let arr = [];
  const tempObj = {};

  while (arr.length < 10) {
    const curNum = Math.floor(Math.random() * 90 + 10);
    // 验重
    if (!tempObj[curNum]) {
      arr.push(curNum);
      tempObj[curNum] = true;
    }
  }
  return quickSort(arr);
}

function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const midIndex = Math.floor(arr.length / 2);
  const midItem = arr[midIndex];
  const left = [];
  const right = [];
  arr.forEach((curItem) => {
    if (curItem > midItem) {
      right.push(curItem);
    } else if (curItem < midItem) {
      left.push(curItem);
    }
  });

  return [].concat(quickSort(left), midItem, quickSort(right));
}

console.log(constructArray());
