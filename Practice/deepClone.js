/**
 * 实现一个对象深拷贝方法
 */

function isObject(target) {
  return target !== null && typeof target === "object";
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
      target[k] = deepClone(data[k]);
    }
  }

  return target;
}

// test

var obj = {
  name: "obj",
  get: function () {
    return this, name;
  },
  count: undefined,
  number: null,
  face: Symbol("unique"),
  hobbies: [1, 2, 3, 4],
  life: {
    eat: true,
    sleep: true,
  },
};
var result = deepClone(obj);

result.name = "result";
result.life.eat = false;

console.log(obj);
console.log(result);
