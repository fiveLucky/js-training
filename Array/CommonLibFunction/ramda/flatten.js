/**
 * flatten
 * http://ramda.cn/docs/#flatten
 * @param data array [1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]
 * @returns Array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */

function flatten(data) {
  if (!Array.isArray(data)) {
    throw new Error("function flatten's param must be an array!");
  }
  return data.reduce((prev, cur) => {
    let curData = cur;
    if (Array.isArray(cur)) {
      curData = flatten(cur);
    }
    return prev.concat(curData);
  }, [])
}

// test 
const testData = [1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]];

const result = flatten(testData);
console.log(result);