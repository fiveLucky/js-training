import { action } from 'mobx';


function filterData(
  data = [],
  {
    collapse = true,
    checked = false,
    defaultValue = true,
    parentValue = 'root',
    index = 0,
  }) {
  return data.map((item, idx) => {
    if (!defaultValue) {
      item.checked = checked;
    }
    item.parentValue = parentValue;
    item.index = parentValue === 'root' ? `${idx}` : `${index}-${idx}`;
    if (item.children && item.children.length > 0) {
      // 有子节点才有折叠
      if (!defaultValue) {
        item.collapse = collapse;
      }
      item.children = filterData(item.children, { parentValue: item.value, index: item.index });
    }
    return { ...item };
  });
}
function flattenMap(data) {
  return data.reduce((pre, cur) => {
    let stash = {};
    if (cur.children && cur.children.length > 0) {
      stash = flattenMap(cur.children);
    }
    pre[cur.index] = cur;
    return { ...pre, ...stash };
  }, {});
}

/**
 * 选中 && 取消选中
 * 折叠 && 展开
 */
function toggle(data, index, type = 'select') {
  const indexArr = index.split('-');
  const frontIndex = indexArr.shift();
  const item = data[frontIndex];
  const length = item.children ? item.children.length : 0;
  if (length > 0) {
    toggle(item.children, indexArr.join('-'));
  } else {
    if (type === 'select') {
      item.checked = !item.checked;
    } else {
      item.collapse = !item.collapse;
    }
  }
}
/**
 * 选中 && 取消选中
 */
function checkAllOrCancel(data, index, { checked = false, defaultValue = true }) {
  const indexArr = index.split('-');
  const frontIndex = indexArr.shift();
  const item = data[frontIndex];
  const length = item.children ? item.children.length : 0;
  if (length > 0) {
    checkAllOrCancel(item.children, indexArr.join('-'));
  } else {
    if (!defaultValue) {
      item.checked = checked;
    }
  }
}

/**
 * 由字节向上循环判断 全选 or 取消全选
 */
function judgeCheckedAll(data, map, index) {
  const indexArr = index.split('-');
  indexArr.pop();
  index = indexArr.join('-');
  const item = map[index];
  if (item.children && item.children.length > 0) {
    const checkedAll = item.children.every(d => d.checked);
    if (checkedAll) {
      checkAllOrCancel(data, index, { checked: true });
    } else {
      checkAllOrCancel(data, index, { checked: false });
    }
    if (indexArr.length > 1) {
      judgeCheckedAll(data, map, index);
    }
  }
}
function getLeastData(data) {
  return data.reduce((pre, cur) => {
    let arr = [];
    if (cur.children && cur.children.length > 0) {
      arr = getLeastData(cur.children);
    } else {
      arr.push(cur.value);
    }
    return pre.concat(arr);
  }, []);
}

function deepClone(source) {
  let target = null;
  if (Object.prototype.toString.call(source) === 'object Object') {
    target = {};
  } else if (Object.prototype.toString.call(source) === 'object Array') {
    target = [];
  } else {
    return source;
  }

  if (Object.prototype.toString.call(source) === 'object Object') {
    Object.keys(source).forEach((key) => {
      target[key] = deepClone(source[key]);
    });
    return target;
  } else if (Object.prototype.toString.call(source) === 'object Array') {
    source.forEach((index) => {
      target.push(deepClone(source[index]));
    });
    return target;
  }
  return target;
}

export default {
  filterData: action(filterData),
  flattenMap: action(flattenMap),
  toggle: action(toggle),
  checkAllOrCancel: action(checkAllOrCancel),
  judgeCheckedAll: action(judgeCheckedAll),
  getLeastData,
  deepClone,
};
