/**
 * @tittle  找出数组中出现次数最多的那个元素
 */

function search(arr) {
  if (!arr.length) {
    return;
  }
  const map = { __result: { count: 0, item: null } };

  for (let index = 0; index < arr.length; index++) {
    const curItem = arr[index];
    if (map[curItem] === undefined) {
      map[curItem] = 1;
    } else {
      map[curItem]++;
      const { __result } = map;
      if (map[curItem] > __result.count) {
        __result.count = map[curItem];
        __result.item = curItem;
      }
    }
  }
  return map.__result;
}

// test

var arr = [1, 2, 3, 4, 5, 4, 7, 8, 7, 4];

console.log(search(arr));

/**
 * @tittle  目标元素在排序数组中出现的次数
 */

//  最简单形式, 对于数组顺序没有要求

function getCount(arr, target) {
  let count = 0;
  arr.forEach((item) => {
    if (item === target) {
      count++;
    }
  });
  return count;
}

// 优化，避免最后面的多余的遍历

function getCount1(arr, target) {
  let count = 0;
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element === target) {
      count++;
      if (arr[index + 1] !== target) {
        return count;
      }
    }
  }
}

// test

var arr = [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 6, 7];

console.log(getCount(arr, 5));
console.log(getCount1(arr, 5));

/**
 * @tittle  找到在字母字符串中只出现一次的第一个字符
 * @example "asdsfdg" => a
 */

function getFirstAppearLetter(str) {
  let start = 0;
  let end = str.length - 1;
  let map = {};
  for (let index = 0; index < str.length; index++) {
    const letter = str[index];
    if (map[letter]) {
      map[letter] += 1;
    } else {
      map[letter] = 1;
    }
  }
  for (let index = 0; index < str.length; index++) {
    const letter = str[index];
    if (map[letter] === 1) {
      return letter;
    }
  }
}

// test
var str = "asdddsffgasaklsdfl";
console.log(getFirstAppearLetter(str));
