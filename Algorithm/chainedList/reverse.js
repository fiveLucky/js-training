/**
 * @tittle  链表翻转
 * @idea  head一直不变，headNode在不断变化
 * @steps [1,2,3,4,5]=> [2,1,3,4,5] => [3,2,1,4,5] => [4,3,2,1,5] => [5,4,3,2,1]
 */

function reverse(head) {
  let currentNode = null;
  let headNode = head;
  while (head && head.next) {
    currentNode = head.next;
    head.next = currentNode.next;
    currentNode.next = headNode;
    headNode = currentNode;
  }
  return headNode;
}

// test

// print
function headToTail(head) {
  const arr = [];
  while (head) {
    arr.push(head.value);
    head = head.next;
  }
  return arr;
}

const chainedList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: {
          value: 5,
          next: null,
        },
      },
    },
  },
};

console.log(headToTail(reverse(chainedList)));
