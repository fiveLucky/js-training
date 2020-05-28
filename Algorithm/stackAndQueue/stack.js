/**
 * @title 栈，先进后出
 * @description 对应数组的 push & pop 方法
 */
// 剑指offer：https://www.nowcoder.com/practice/54275ddae22f475981afa2244dd448c6?tpId=13&tqId=11158&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking

/**
 * @title 使用两个栈实现一个队列
 * @idea  队列是先进先出，第一个栈用来模拟进入队列，第二个栈模拟出队列，这里需要翻转stack1的顺序，即stack1出栈，stack2入栈即可
 */

let stack1 = [];
let stack2 = [];
function push(node) {
  stack1.push(node);
}

function pop() {
  if (stack2.length === 0) {
    while (stack1.length) {
      stack2.push(stack1.pop());
    }
  }
  return stack2.pop();
}
