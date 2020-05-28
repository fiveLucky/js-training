/**
 * @tittle  给定一个数组，使数组的所有奇数位于偶数前面
 * @example [1,2,3,4,5] => [1,3,5,2,4]
 * @idea  使用两个指针，从数组两端分别进行查找，头指针遇到偶数就和尾指针遇到的奇数调换位置，直到两个指针相遇结束
 */

function oddFrontOfEven(arr) {
  let num = 0;
  if (Array.isArray(arr) && arr.length > 1) {
    let leftPointer = 0;
    let rightPointer = arr.length - 1;

    while (leftPointer < rightPointer) {
      while (arr[leftPointer] % 2 === 1) {
        leftPointer++;
        num++;
      }
      while (arr[rightPointer] % 2 === 0) {
        rightPointer--;
        num++;
      }
      if (leftPointer < rightPointer) {
        [arr[rightPointer], arr[leftPointer]] = [arr[leftPointer], arr[rightPointer]];
        // 优化无用的循环次数
        rightPointer--;
        leftPointer++;
      }
    }
  }
  return [arr, num];
}

// test

var arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(oddFrontOfEven(arr));
