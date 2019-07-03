
/**
 * 实现一个对象深拷贝方法
 */


function isObject(target) {
  return target !== null && typeof target === 'object';
}

function deepClone(data) {
  if (!isObject(data)) {
    return data;
  }
  // function 不用复制，只考虑对象和数组即可
  const target = Array.isArray(data) ? [] : {};
  // for in 遍历
  for (let k in data) {
    // 判断是否是实例属性
    if (data.hasOwnProperty(k)) {
      const value = data[k];
      target[k] = isObject(data) ? deepClone(value) : value;
    }
  }

  return target;
}

// test

var obj = {
  a: 'a',
  b: [
    {
      c: 'c',
      d: ['e', 'f']
    },
    [1, 2, 3, 4, 5]
  ],
  g: {
    h: 6
  }
}

console.log(deepClone(obj));

