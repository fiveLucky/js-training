/**
 * 实现一个方法，处理url参数
 */



function parse(url) {
  const query = url.includes('?') ? url.split('?')[1] : url;
  const decodeUrl = query ? decodeURIComponent(query) : '';
  const queryArr = decodeUrl.split('&');
  let data = {};
  queryArr.forEach((item) => {
    let [key, value] = item.split('=');
    if (/^[0-9]+$/.test(value)) {
      value = +value
    }
    const k = key.replace('[]', '')
    if (key.includes('[]') && !data[k]) {
      data[k] = [];
    }
    if (Array.isArray(data[k])) {
      data[k].push(value)
    } else {
      data[k] = value
    }
  })
  return data
}

// test

var a = 'token[]=a&token[]=b&id=123';
console.log(parse(a)); // { taken: [ ]}