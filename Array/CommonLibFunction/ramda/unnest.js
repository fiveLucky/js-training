/**
 * unnest
 * http://ramda.cn/docs/#unnest
 * @param data array [1, [2], [[3]]]
 * @returns Array [1, 2, [3]]
 */

function unnest(data) {
  if (!Array.isArray(data)) {
    throw new Error("function unnest's param must be an array!");
  }
  return data.reduce((prev, cur) => {
    return prev.concat(cur);
  }, [])
}

// test 
const testData1 = [1, [2], [[3]]];
const testData2 = [[1, 2], [3, 4], [5, 6]];

const result1 = unnest(testData1);
const result2 = unnest(testData2);
console.log(result1);
console.log(result2);