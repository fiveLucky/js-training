/**
 * @tittle  大数字计算
 * @description js对于数字有限制，超过限制后会展示成科学计数法，而且精度会有问题
 */

//  计算整数加法

function add(a, b) {
  let aStr = a + "";
  let bStr = b + "";
  const maxLength = Math.max(aStr.length, bStr.length);
  aStr = aStr.padStart(maxLength, 0);
  bStr = bStr.padStart(maxLength, 0);
  let carry = 0;
  let result = "";
  let temp = 0;
  // 拆分成每一位计算，进位加到下一位计算中
  for (let index = maxLength - 1; index > -1; index--) {
    temp = Number(aStr[index]) + Number(bStr[index]) + carry;
    // 一位计算最大值不超过18
    carry = Math.floor(temp / 10);
    result = (temp % 10) + result;
  }
  // 最后一次进位
  if (carry) {
    result = carry + result;
  }
  return result;
}

// test

var a = 7199254740991;
var b = 1234567899999999999;

console.log(add(a, b));
