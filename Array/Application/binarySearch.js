/**
 * 二分法查找数组元素
 */

function binarySearch(arr, target) {
  var start = 0;
  var end = arr.length - 1;

  while (start <= end) {
    var mid = parseInt((start + end) / 2, 10);
    if (target === arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}

// test

var a = [1, 2, 3, 4, 5, 6, 7];

binarySearch(a, 9); // -1
binarySearch(a, 4); // 3

/**
 * 查找某个元素是否存在
 */
// [1, 2, 3]
// [4, 5, 6]
// [7, 8, 9]

function find(source, target) {
  let y = source.length - 1;
  let x = 0;

  while (y >= 0 && x < source[0].length) {
    const value = source[y][x];
    if (value === target) {
      return [y, x];
    } else if (value > target) {
      y--;
    } else {
      x++;
    }
  }

  return false;
}

// test

var arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
find(arr, 6);

/**
 * 翻转链表
 */

function reverseLinkedList(head) {
  if (!head) return null;
  if (!head.next) return head;
  let current = head;
  let currentNext = null;
  let stash = null;
  let newhead = head;

  while (current.next) {
    currentNext = current.next;
    stash = currentNext.next;
    currentNext.next = newhead;
    current.next = stash;
    newhead = currentNext;
  }

  return newhead;
}

/**
 * 二叉树深度
 */

function deepness(root) {
  if (!root) return 0;
  return Math.max(deepness(root.left), deepness(root.right)) + 1;
}

// test

var tree = {
  value: "a",
  left: {
    value: "b",
    left: {
      value: "d",
      right: {
        value: "h",
      },
    },
  },
  right: {
    value: "b",
    left: {
      value: "d",
      right: {
        value: "h",
      },
    },
  },
};

deepness(tree);

/**
 * 二叉树宽度
 */

function width(root, map = {}, deep = 1) {
  if (map[deep] === undefined) {
    map[deep] = 1;
  } else {
    map[deep]++;
  }
  deep++;
  if (root.left) {
    width(root.left, map, deep);
  }
  if (root.right) {
    width(root.right, map, deep++);
  }
}

// test

var tree = {
  value: "a",
  left: {
    value: "b",
    left: {
      value: "d",
      right: {
        value: "h",
      },
      left: {
        value: "h",
      },
    },
    right: {
      value: "d",
      right: {
        value: "h",
      },
      left: {
        value: "h",
        left: {
          value: "q",
        },
      },
    },
  },
  right: {
    value: "b",
    left: {
      value: "d",
      right: {
        value: "h",
      },
    },
  },
};

var map = {};

width(tree, map);
console.log(map);
