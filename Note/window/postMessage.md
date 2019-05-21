# postMessage 方法的小坑

[MDN简介](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

### 场景

在很多时候，我们会遇到编辑操作，点击编辑按钮打开一个新页面，在新页面操作完成之后，需要对父页面做操作，比如：列表刷新。这时需要两个窗口通信，通信方式有很多，比如：在父页面window上添加一些callbackId，然后子页面的`window.opener[callbackId]`调用对应函数。但是为了支持 electron（[新的页面的window.opener是一个被electron重写的对象，只有window的少数方法和属性](https://electronjs.org/docs/api/browser-window-proxy)），所以选择 postMessage。想要把 postMessage 和 addEventListener 这种异步通信方式封装成 promise 形式，所以就踩了个坑。

### 代码

```js

// 方案一：trigger时返回一个promise，在注册的回调函数里resolve，子页面就可以拿到cb的返回值。

  class Talk{

    // 父页面调用的方法 
    register(cb){
      // 打开一个新页面
      window.open('xxx');
      // 监听
      window.addEventListener('message', e => {
        const cbResult = cb(e.data.data);
        // resolve
        e.data.resolve(cbResult);
      })
    }
    // 子页面调用的方法
    trigger = (...args) => {
      return new Promise((res, rej) => {
        // 将 res 传到父页面
        const data = {
          resolve:res,
          data: args
        }
        // 看文档我们知道，postMessage已经支持了复杂类型的数据，而不仅仅是字符串
        // 但是在promise里，还是只能为字符串，具体原因不清楚，这里会想到JSON.stringify
        // JSON.stringify 会过滤掉数据里的函数、Symbol、undefined
        // 所以，这种方式行不通了
        window.opener.postMessage(data);
      })
      
    }

  }

// 方案二：trigger时返回一个promise，子页面发消息 -> 父页面收到消息，再发送cb返回值 -> 子页面收到消息，执行resovle

  class Talk{

    // 父页面调用的方法
    register(cb){
      // 打开一个新页面
      const opener = window.open('xxx');
      // 监听
      window.addEventListener('message', e => {
        const cbResult = cb(e.data.data);
        // 发送消息， 需要调用子页面window的postMessage方法，第二个参数是targetOrigin，* 为不限制
        opener.postMessage(cbResult, '*');
      })
    }
    // 子页面调用的方法
    trigger = (...args) => {
      window.opener.postMessage(...args);
      return new Promise((res, rej) => {
        // 子页面监听事件
        window.addEventListener('message', e => {
          res(e.data)
        })
      })
    }
  }
```

### 总结

- 在promise里，postMessage 传输的数据只能为字符串
- JSON.stringify 会过滤掉数据里的函数、Symbol、undefined
- window.addEventListener(type,cb, option ), option.once = true 时，只会调用一次listener，然后这个type的listener都会被 remove，参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
