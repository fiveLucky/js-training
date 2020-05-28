/**
 * @tittle  链表打印
 */

function Node(value) {
  this.value = value;
  this.next = null;
}

/**
 * 从头到尾打印
 */

function headToTail(head) {
  const arr = [];
  while (head) {
    arr.push(head.value);
    head = head.next;
  }
  return arr;
}

/**
 * 从尾到头打印
 */

function tailToHead(head) {
  const arr = [];
  while (head) {
    arr.unshift(head.value);
    head = head.next;
  }
  return arr;
}

// test

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

console.log(headToTail(chainedList));
console.log(tailToHead(chainedList));
