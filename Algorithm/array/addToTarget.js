/**
 * @tittle 查询一组数字中加和等于目标值的所有数字对
 * @idea  使用一个对象用来遍历过程中查询
 *
 */

function addToTarget(arr, target) {
  const map = {};
  const result = [];
  for (let index = 0; index < arr.length; index++) {
    const item = arr[index];
    map[item] = item;
    const num = target - item;
    if (map[num] !== undefined) {
      result.push([map[num], item]);
    }
  }
  return result;
}

// test

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(addToTarget(arr, 9));
var arr1 = [3, 2, 4, 5, 10, 7, 8, 9];
console.log(addToTarget(arr1, 10));
