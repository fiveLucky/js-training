
/**
 * @description Request 方法
 */


function parseParamToUri(uri, data, method) {
  if (method === 'get') {
    return uri
  }
}





class Request {
  static unique = new Request();
  constructor() {
    // 单例
    if (Request.unique) {
      return Request.unique
    }
    this.stashPromiseList = [];
    this.notPenddingPromise = null;
    this.superStashPromiseList = [];
    this.promiseIndex = 0;
  }
  _fetch(uri, options) {

    const defaultOptions = {
      // default options

      ...options,
      headers: {

        ...options.headers,
      }
    }
    if (this.stashPromiseList.length > 5) {
      return Promise.reject('超过最大并发数');
    }
    return new Promise((resolve, reject) => {
      this.promiseIndex += 1;
      const index = this.promiseIndex - 1;
      this.stashPromiseList.push(index);
      fetch(uri, options).then(response => {
        const isJsonData = response.headers.get('content-type').indexOf('application/json') > -1;
        if (isJsonData) {
          response.json()
            .then(resolve)
            .catch(reject)
        } else {
          response.text()
            .then(resolve)
            .catch(reject)
        }
      }).catch((err) => {
        reject(err);
      }).finally(() => {
        this.stashPromiseList.splice(index);
      })
    })
  }
  get(uri) {
    return this._fetch(uri, {
      method: 'get'
    })
  }
  post(uri) {
    return this._fetch(uri, {
      method: 'post'
    })
  }
}

var request = new Request();

