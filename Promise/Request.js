
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
   this.running_count = 0;
   this.await_queue = [];
   this.max_limit = 10;
  }
  async _fetch(uri, options) {
    const defaultOptions = {
      ...options,
      headers: {
        ...options.headers,
      }
    }
    if (this.running_count === this.max_limit) {
       await this._wait();
    }
    return new Promise((resolve, reject) => {
      this.running_count += 1;
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
        this.running_count -= 1;
        this._letsGo();
      })
    })
  }
  _wait(){
    return new Promise((res) => {
      this.await_queue.push(res);
    })
  }
  _letsGo(){
    if(this.await_queue.length === 0){
      return
    } 
    this.await_queue.shift()();
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

export default new Request()

// test

const request = new Request();

Array(25).fill('https://www.baidu.com').forEach((uri,index) => {
  request.get(uri).then(()=> {
    console.info('im ok',index)
  })
});