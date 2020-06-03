/**
 * @tittle  深度优先遍历
 * @description 先按照一个分支遍历，然后再遍历其他分支
 * @application 递归
 */

//  二叉树遍历

// 前序遍历

function preOrder(tree, result = []) {
  if (tree) {
    const { left, right, value } = tree;

    result.push(value);
    preOrder(left, result);
    preOrder(right, result);
  }

  return result;
}

// 非递归

function preOrderTraversal(tree) {
  const result = [];
  // 存储每个父节点，目的为了得到右节点
  const stack = [];
  let current = tree;

  while (current || stack.length) {
    while (current) {
      result.push(current.value);
      // 优化，减少不必要的循环
      if (current.left) {
        stack.push(current);
      }
      current = current.left;
    }
    if (stack.length) {
      current = stack.pop();
      current = current.right;
    }
  }

  return result;
}

// 中序遍历

function midOrder(tree, result = []) {
  if (tree) {
    const { left, right, value } = tree;
    midOrder(left, result);
    result.push(value);
    midOrder(right, result);
  }

  return result;
}

// 非递归

function midOrderTraversal(tree) {
  const result = [];
  const stack = [];
  let current = tree;

  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.value);
    current = current.right;
  }
  return result;
}
// 后序遍历

function afterOrder(tree, result = []) {
  if (tree) {
    const { left, right, value } = tree;

    afterOrder(left, result);
    afterOrder(right, result);
    result.push(value);
  }

  return result;
}

// 非递归

function afterOrderTraversal(tree) {
  const result = [];
  const stack = [];
  let current = tree;
  let visitedItem = null;

  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack[stack.length - 1];
    // 最小子节点 || 已经访问过右节点。避免死循环
    if (!current.right || visitedItem === current.right) {
      current = stack.pop();
      result.push(current.value);
      visitedItem = current;
      current = null;
    } else {
      current = current.right;
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

// console.log(preOrder(tree));
// console.log(preOrderTraversal(tree));
// console.log(midOrder(tree));
// console.log(midOrderTraversal(tree));
console.log(afterOrder(tree));
console.log(afterOrderTraversal(tree));
