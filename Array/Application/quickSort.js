/**
 * 快速排序
 */

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const index = Math.floor(arr.length / 2);
  // 得到一个基准值，最好是中间值
  const base = arr[index];
  let left = [];
  let right = [];

  // 遍历数组
  arr.forEach((item) => {
    if (item < base) {
      left.push(item);
    }
    if (item > base) {
      right.push(item);
    }
  });

  // 递归循环
  return quickSort(left).concat(base, quickSort(right));
}

// test

var arr = [23, 56, 77, 4, 45, 24, 29, 54];

quickSort(arr);

/**
 * 实战
 *
 * @description 最长不重复字符串长度
 * @input  "abcbcb"
 * @output  3
 */

function getUniqueStringLength(str) {
  let uniqueStr = "";
  const lengthStack = [];

  for (let i = 0; i < str.length; i++) {
    const letter = str[i];
    const reg = new RegExp(letter);
    if (!reg.test(uniqueStr)) {
      uniqueStr += letter;
    } else {
      lengthStack.push(uniqueStr.length);
      uniqueStr = letter;
    }
  }

  return quickSort(lengthStack)[lengthStack.length - 1];
}

getUniqueStringLength("pwwkew");

/**
 * @description 输入只包含 ()，获取包含最长有效括号的子串长度
 *
 * @input "(()" ")()())"
 * @output  2:"()"  4:"()()"
 */

function getValidParentheses(str) {
  let result = "";

  for (let index = 0; index < str.length; index++) {
    const cur = str[index];
    const next = str[index + 1];
    if (cur === "(" && next === ")") {
      result += "()";
    } else if ((cur === "(" && next === "(") || (cur === ")" && next === ")")) {
      result += "&";
    } else {
      continue;
    }
  }
  const arr = result.split("&");

  let max = arr[0].length;

  for (let index = 0; index < arr.length; index++) {
    const item = arr[index];
    if (max < item.length) {
      max = item.length;
    }
  }

  return max;
}

getValidParentheses("(()");
