// https://github.com/azl397985856/leetcode/blob/master/problems/20.validParentheses.md


// 我的方案  完全脱离了堆栈的概念
function validParentheses(str) {
  // 按顺序过滤出字符串里的所有括号
  const parenthesesMap = {
    '{': '}',
    '[': ']',
    '(': ')',
  }
  const exp = /([\{\[\(\)\]\}])/g
  const matches = str.match(exp);
  if (matches.length % 2 !== 0) {
    return false;
  }
  const half = matches.length / 2;
  const leftPartList = matches.slice(0, half);
  const leftStr = leftPartList.map(p => parenthesesMap[p]).reverse().join(',');
  const rightStr = matches.slice(half).join(',');
  return leftStr === rightStr;
}

// test
const str1 = 'werw{23432[sdfsf(sfsfsd]sdfd)sdfd}fdsfsf';
const str2 = 'werw{23432[sdfsfsfsfsd]sdfd)sdfd}fdsfsf';
const str3 = 'werw{23432[sdfsf(sfsfsd)sdfd]sdfd}fdsfsf';
console.log(validParentheses(str1))
console.log(validParentheses(str2))
console.log(validParentheses(str3))


// 楼主的方案  入栈出栈，对比排除
function validParentheses(str) {
  // 我的改造
  const exp = /([\{\[\(\)\]\}])/g
  const pStr = str.match(exp).join('');
  if (pStr.length % 2 !== 0) {
    return false;
  }

  // 下面是楼主的代码
  const parenthesesMap = {
    '{': '}',
    '[': ']',
    '(': ')',
  }
  const stack = [];
  for (let i in pStr) {
    const item = pStr[i];
    if (['{', '[', '('].indexOf(item) > -1) {
      stack.push(item);
    } else {
      const peak = stack.pop();
      if (item !== parenthesesMap[peak]) {
        return false;
      }
    }
  }
  if (stack.length > 0) {
    return false
  }
  return true;
}


// test
const str1 = 'werw{23432[sdfsf(sfsfsd]sdfd)sdfd}fdsfsf';
const str2 = 'werw{23432[sdfsfsfsfsd]sdfd)sdfd}fdsfsf';
const str3 = 'werw{23432[sdfsf(sfsfsd)sdfd]sdfd}fdsfsf';
console.log(validParentheses(str1))
console.log(validParentheses(str2))
console.log(validParentheses(str3))


/**
 * 拓展：检测html标签闭合是否完整
 */

function checkHtml(str) {
  const exp = /(\<[\w\s=\"\'\-\,\.]+\>)?(\<\/[\w\s=\"\'\-\,\.]+\>)?]/g
}


const temp = '<div id="first" class="red"><span>hello world! </span></div>';
