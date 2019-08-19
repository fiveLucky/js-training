/**
 * 字符出现的次数
 */

function getCount(str) {
  const arr = [...new Set(str.split(""))];
  let obj = {};
  arr.forEach(k => {
    obj[k] = str.split(k).length - 1;
  });
  return obj;
}

function getCount2(str) {
  const obj = Object.create(null);

  for (var i = 0; i < str.length - 1; i++) {
    if (obj[str[i]]) {
      obj[str[i]]++;
    } else {
      obj[str[i]] = 1;
    }
  }

  var num = 0;
  var char = "";
  for (var key in obj) {
    if (obj[key] > num) {
      num = obj[key];
      char = key;
    }
  }

  return { num, char };
}

// test

var s = "wewerereeeeeee2423432sdfdsff";
getCount(s);
getCount2(s);
