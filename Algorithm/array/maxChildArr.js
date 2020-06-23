/**
 * @title 输出数组项加和最大的子序列
 */

function search(arr) {
  const len = arr.length;
  if (len < 0) {
    return 0;
  }
  let sum = arr[0],
    maxSum = arr[0],
    maxArr = [sum];
  for (let i = 1; i < len; i++) {
    if (sum > 0) {
      sum += arr[i];
      maxArr.push(arr[i]);
    } else {
      sum = arr[i];
      maxArr = [arr[i]];
    }
    // maxSum = sum > maxSum ? sum : maxSum;
    if (sum > maxSum) {
      maxSum = sum;
    } else {
      maxArr.pop();
    }
  }
  return maxArr;
}

// test

var arr = [1, 3, -4, 5, 6, -1];
console.log(search(arr));
