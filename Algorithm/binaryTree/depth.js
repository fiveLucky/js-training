/**
 * @tittle  二叉树深度
 * @description 左节点深度 + 右节点深度 + 1(root)
 */

//  最大深度
var maxDepth = (tree) => (!tree ? 0 : Math.max(maxDepth(tree.left), maxDepth(tree.right)) + 1);

var minDepth = (tree) => {
  if (!tree) {
    return 0;
  }
  if (!tree.left) {
    return minDepth(tree.right) + 1;
  }
  if (!tree.right) {
    return minDepth(tree.left) + 1;
  }

  return Math.min(minDepth(tree.left), minDepth(tree.right)) + 1;
};

// test

var tree = {
  value: 1,
  left: {
    value: 2,
    // left: {
    //   value: 4,
    // },
    // right: {
    //   value: 5,
    // },
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

console.log(maxDepth(tree));
console.log(minDepth(tree));
