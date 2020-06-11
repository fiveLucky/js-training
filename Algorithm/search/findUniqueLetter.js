/**
 * @tittle  查找一个字符串中第一个只出现一次的字符
 * @example "google" => l
 */

function find(str) {
  const map = {};

  for (let index = 0; index < str.length; index++) {
    const letter = str[index];
    if (map[letter]) {
      map[letter]++;
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

console.log(find("google"));
