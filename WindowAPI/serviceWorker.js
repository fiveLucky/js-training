// 参考文档 https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage

this.addEventListener("install", (e) => {
  // install 下载缓存，这里可以进行缓存逻辑
  // caches 是 CacheStorage 的 引用, open 方法是 开启缓存
  e.waitUntil(
    caches.open("version-2").then((cache) => {
      // 执行 addAll 会请求一次 这些文件
      return cache.addAll(["../data"]);
    })
  );
});

// 拦截 fetch 请求

this.addEventListener("fetch", (e) => {
  caches.keys().then((res) => console.log(res));
  console.log(e.request, "url");
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || this.postMessage("refetch");
    })
  );
});

// 清除缓存
this.addEventListener("activate", function (event) {
  var cacheWhitelist = ["version-2"];

  // event.waitUntil(
  //   caches.keys().then(function (keyList) {
  //     return Promise.all(
  //       keyList.map(function (key) {
  //         if (cacheWhitelist.indexOf(key) === -1) {
  //           return caches.delete(key);
  //         }
  //       })
  //     );
  //   })
  // );
});
