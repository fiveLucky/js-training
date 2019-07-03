/**
 * 二分法查找数组元素
 */

function binarySearch(arr, target) {
  var start = 0;
  var end = arr.length - 1;

  while (start <= end) {
    var mid = parseInt(start + ((end - start) / 2), 10);
    if (target === arr[mid]) {
      return mid
    } else if (target > arr[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1
}

// test

var a = [1, 2, 3, 4, 5, 6, 7];

binarySearch(a, 9); // -1
binarySearch(a, 4); // 3