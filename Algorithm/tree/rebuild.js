/**
 * @tittle  重建二叉树
 * @description 给出二叉树的 前序遍历 和 中序遍历，输出整棵树
 * @idea  前序遍历能得出root节点，中序遍历能得到左子树和右子树长度
 */

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function rebuild(preTraverse, midTraverse) {
  if (!preTraverse.length) {
    return null;
  }
  // 最小子节点
  if (preTraverse.length === 1) {
    return new Node(preTraverse[0]);
  }
  const rootNodeValue = preTraverse[0];
  const index = midTraverse.indexOf(rootNodeValue);
  const preLeft = preTraverse.slice(1, index + 1);
  const preRight = preTraverse.slice(index + 1);
  const midLeft = midTraverse.slice(0, index);
  const midRight = midTraverse.slice(index + 1);
  const node = new Node(rootNodeValue);
  node.left = rebuild(preLeft, midLeft);
  node.right = rebuild(preRight, midRight);
  return node;
}

// test

var preArr = [1, 2, 4, 5, 3, 6, 7];
var midArr = [4, 2, 5, 1, 6, 3, 7];

console.log(rebuild(preArr, midArr));
