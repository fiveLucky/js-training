
function handleError(param) {
  if (typeof param !== 'object') {
    throw new Error(param + 'is not a function')
  }
  throw new Error(Object.prototype.toString.call(param) + 'is not a function')
}



var arr = new Array(20).fill(1)




/**
 * @name map
 * @param handle  function
 * @return array
 */

Array.prototype.map = function (handle) {
  if (typeof handle !== 'function') {
    handleError(handle);
  }
  var returnValues = [];
  for (var i = 0; i < this.length; i++) {
    returnValues[i] = handle(this[i], i, this);
  }
  return returnValues;
}


/**
 * @name forEach
 * @param handle function
 * @return void
 */

Array.prototype.forEach = function (handle) {
  if (typeof handle !== 'function') {
    handleError(handle);
  }
  for (var i = 0; i < this.length; i++) {
    handle(this[i], i, this);
  }
}


/**
 * @name reduce
 * @param handle function
 * @param preset any
 * @return array
 */
Array.prototype.reduce = function (handle, preset) {
  if (typeof handle !== 'function') {
    handleError(handle);
  }
  if (this.length === 0) {
    throw new Error('Reduce of empty array with no initial value')
  }
  var pre = preset || this[0];
  var i = 0
  if (!preset) {
    i = 1
  }
  for (; i < this.length; i++) {
    pre = handle(pre, this[i], i, this);
  }
  return pre;
}


/**
 * @name some
 * @param handle function
 * @return boolean
 */

Array.prototype.some = function (handle) {
  if (typeof handle !== 'function') {
    handleError(handle);
  }
  for (var i = 0; i < this.length; i++) {
    if (handle(this[i], i, this)) {
      return true
    }
  }
  return false;
}


/**
 * @name every
 * @param handle function
 * @return boolean
 */

Array.prototype.every = function (handle) {
  if (typeof handle !== 'function') {
    handleError(handle);
  }
  for (var i = 0; i < this.length; i++) {
    if (!handle(this[i], i, this)) {
      return false
    }
  }
  return true
}

/**
 * @name filter
 * @param handle function
 * @return array
 */

Array.prototype.filter = function (handle) {
  if (typeof handle !== 'function') {
    handleError(handle);
  }
  var returnVlaues = [];
  for (var i = 0; i < this.length; i++) {
    if (handle(this[i], i, this)) {
      returnVlaues[returnVlaues.length] = this[i];
    }
  }
  return returnVlaues;
}

/**
 * @name find
 * @param handle function
 * @return any
 */

Array.prototype.find = function (handle) {
  if (typeof handle !== 'function') {
    handleError(handle);
  }
  for (var i = 0; i < this.length; i++) {
    if (handle(this[i], i, this)) {
      return this[i];
    }
  }
}


/**
 * @name findIndex
 * @param handle function
 * @return any
 */

Array.prototype.findIndex = function (handle) {
  if (typeof handle !== 'function') {
    handleError(handle);
  }
  for (var i = 0; i < this.length; i++) {
    if (handle(this[i], i, this)) {
      return i;
    }
  }
  return -1;
}