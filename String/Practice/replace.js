/**
 * 实现一个自定义模板字符串功能
 */

function replace(target, data) {
  return target.replace(/\{([a-z]+)\}/g, (match, key) => {
    return data[key]
  })
}



// test

var a = 'hi, my name is {name}, I am {age} years old, my email is {email}.';
var b = { name: 'max', age: 12, email: 'max@gmail.com' };

replace(a, b)