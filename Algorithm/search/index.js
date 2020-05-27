/**
 * @title 查找指定元素是否在数组内
 * @description 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 * @example arr = [[1,3,5,8,9],[3,4,6,7,8],[5,7,9,12,15]]
 */

function find(target, arr) {
  const xLen = arr[0].length - 1;
  let y = arr.length - 1;

  for (var x = 0; x < xLen && y >= 0; ) {
    const currentItem = arr[y][x];
    if (currentItem > target) {
      x++;
    } else if (currentItem < target) {
      y--;
    } else {
      return true;
    }
  }
  return false;
}

// test

const arr = [
  [1, 3, 5, 8, 9],
  [3, 4, 6, 7, 8],
  [5, 7, 9, 12, 15],
];

console.log(find(2, arr));
console.log(find(5, arr));
console.log(find(5, [[]]));
