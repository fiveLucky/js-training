/**
 * @title 把一个整数数组内的所有数字排列，输出排列后数值最小的组合结果
 * @example [12,32,123] => 1212332
 */

function arrangeNum(arr) {
  return arr
    .sort((a, b) => {
      const f = a + "" + b;
      const s = b + "" + a;
      return f - s;
    })
    .join("");
}

// test

var arr = [12, 32, 123];

console.log(arrangeNum(arr));

var arr1 = [1, 2, 3, 4, 5, 6];

console.log(arrangeNum(arr1));
