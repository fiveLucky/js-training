
function isPromise(target) {
  return Object.prototype.toString.call(target) === '[object Promise]';
}


class Promise {
  constructor(handle) {
    if (typeof handle !== 'function') {
      throw new Error('parameter must be a function')
    };
    this._status = 'PENDING';
    this._value = undefined;
    this._promise_res_queue = [];
    this._promise_rej_queue = [];
    try {
      handle(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      throw err
    }
  }

  _resolve(val) {
    if (this._status !== 'PENDING') {
      return;
    }
    this._status = 'FULLFILLED';
    this._value = val;
    return this;
  }
  _reject(val) {
    if (this._status !== 'PENDING') {
      return;
    }
    this._status = 'REJECTED';
    this._value = val;
    return this;
  }
  then(callback) {
    if (this._status !== 'FULLFILLED') {
      return;
    }
    if (!callback) {
      // throw error
    }
    return new Promise((res, rej) => {
      try {
        this._value = callback(this._value);
        res(this.value);
      } catch (e) {
        rej(e)
      }

    })
  }

  catch(callback) {
    if (this._status !== 'REJECTED') {
      return;
    }
    if (!callback) {
      // throw error
    }
    this._value = callback(this._value);
    return this;
  }

  static resovle = (...arg) => {
    return new Promise((resovle,null) => {
      resovle(arg)
    })
  }
  static reject = (...arg) => {
    return new Promise((null, reject) => {
      reject(arg)
    })
  }

  static all = (promiseList) => {
    if (promiseList === undefined) {
      throw new Error('undefined is not iterable (cannot read property Symbol(Symbol.iterator))')
    }
    return new Promise((resolve, reject) => {
      for (var i = 0; i < promiseList.length; i++) {
        var _promise = promiseList[i];
        _promise.then(res => {
          this._promise_res_queue.push(res);
        }).catch(err => {
          this._promise_rej_queue.push(err);
        })
      }
      if (this._promise_res_queue.length === promiseList.length) {
        resolve(this._promise_res_queue)
      }
      if (this._promise_rej_queue.length > 0) {
        reject(this._promise_rej_queue)
      }
    })
  }
  static race = (promiseList) => {
    if (promiseList === undefined) {
      throw new Error('undefined is not iterable (cannot read property Symbol(Symbol.iterator))')
    }
    return new Promise((resolve, reject) => {
      for (var i = 0; i < promiseList.length; i++) {
        var _promise = promiseList[i];
        _promise.then(res => {
          this._promise_res_queue.push(res);
        }).catch(err => {
          this._promise_rej_queue.push(err);
        })
      }
      if (this._promise_res_queue.length > 0) {
        resolve(this._promise_res_queue)
      }
      if (this._promise_rej_queue.length > 0) {
        reject(this._promise_rej_queue)
      }
    })
  }
}


var p = new Promise();
console.log(p.all())