/**
 * @tittle  广度优先遍历
 * @description 横向遍历，利用队列先进先出的特性，把树节点从左到右依次添加到队列里，然后遍历
 */

//  从上到下 从左到右
function bfs(tree) {
  const result = [];
  const stack = [];

  stack.push(tree);

  while (stack.length) {
    const currentItem = stack.shift();
    const { left, right, value } = currentItem;

    if (left) {
      stack.push(left);
    }
    if (right) {
      stack.push(right);
    }
    result.push(value);
  }

  return result;
}

// 分行打印
function bfs1(tree) {
  const result = [];
  const stack = [];
  // 缓存每一行的value
  let stashRowData = [];
  // 当前行元素数量
  let curRowItemNum = 1;
  // 下一行子元素数量
  let nextRowChildNum = 0;
  stack.push(tree);
  while (stack.length) {
    const currentItem = stack.shift();
    const { left, right, value } = currentItem;
    if (left) {
      stack.push(left);
      // 计数
      nextRowChildNum++;
    }
    if (right) {
      stack.push(right);
      // 计数
      nextRowChildNum++;
    }
    stashRowData.push(value);
    curRowItemNum--;
    // 当前行遍历结束
    if (curRowItemNum === 0) {
      // 保存当前行最后的数组结果
      result.push(stashRowData);
      // 清空
      stashRowData = [];
      // 下一行的元素数量
      curRowItemNum = nextRowChildNum;
      // 清零
      nextRowChildNum = 0;
    }
  }

  return result;
}

/**
 *  test 
 *  
 *           1

        2         3

    4      5   6     7

 */

var tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
    },
    right: {
      value: 5,
    },
  },
  right: {
    value: 3,
    left: {
      value: 6,
    },
    right: {
      value: 7,
    },
  },
};

console.log(bfs(tree));
console.log(bfs1(tree));
