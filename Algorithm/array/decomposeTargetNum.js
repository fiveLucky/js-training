/**
 * @tittle  输入一个正数S，打印出所有和为S的连续正数序列。
 * @example 输入15，有序1+2+3+4+5 = 4+5+6 = 7+8 = 15 => [[1,2,3,4,5],[4,5,6],[7,8]]
 * @idea
 *  [1, 2, 3, 4, 5, 6, 7, ...]
 *  [             ]
 *  [                ]
 *    [              ]
 *        [          ]
 *           [       ]
 * 先找到第一组加和等于target值的序列，然后再让该序列大于target，左侧开始删除，直到再次等于target，然后继续循环
 * 直到循环到target结束
 */

function print(target) {
  let clear = 1;
  let fill = 2;
  let child = [1, 2];
  let currentCount = 3;
  while (fill < target) {
    while (currentCount < target && fill < target) {
      fill++;
      child.push(fill);
      currentCount += fill;
    }

    while (currentCount > target && clear < fill) {
      child.shift();
      currentCount -= clear++;
    }
  }
}
