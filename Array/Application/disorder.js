/**
 * @tittle  乱序
 */

function disorder(array) {
  const l = array.length;
  let curIndex = -1;

  while (++curIndex < l) {
    const randomIndex = Math.floor(l * Math.random());
    [array[curIndex], array[randomIndex]] = [array[randomIndex], array[curIndex]];
  }

  return array;
}

// test
const arr = [1, 2, 3, 4, 5, 6, 7, 8];

const result = disorder(arr);
console.log(result);
