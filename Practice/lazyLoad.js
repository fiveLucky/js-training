export default function lazyLoad() {
  var imgList = document.getElementsByClassName("lazy");

  // 使用新API
  // 需要图片指定宽高

  if (IntersectionObserver) {
    var lazyImageObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry, index) {
          // 有个bug，页面特别特别慢的滚动，这里的值还是0， 所以需要 threshold 设定一下，在大于 0 的时候触发回调
          console.log(entry.intersectionRatio);
          if (entry.intersectionRatio > 0) {
            var imgEl = entry.target;
            console.log(imgEl);
            var dataSrc = imgEl.getAttribute("data-src");
            if (imgEl.src !== dataSrc) {
              imgEl.src = dataSrc;
            }
            lazyImageObserver.unobserve(imgEl);
          }
        });
      },
      {
        threshold: [0.01],
      }
    );

    for (let index = 0; index < imgList.length; index++) {
      var img = imgList[index];
      lazyImageObserver.observe(img);
    }
  } else {
    // 兼容低级浏览器
    window.addEventListener("scroll", throttle(commonLazy, 500));
    var imgIndex = 0;
  }

  // 节流
  function throttle(fn, delay) {
    var timer = null;
    var time = 0;

    return function () {
      var duration = Date.now() - time;
      var args = arguments;
      var self = this;
      if (duration > delay) {
        time = Date.now();
        clearTimeout(timer);
        fn.apply(this, args);
      } else if (!timer) {
        var remaining = delay - duration;
        timer = setTimeout(function () {
          fn.apply(self, args);
          timer = null;
          time = Date.now();
        }, remaining);
      }
    };
  }

  function commonLazy() {
    var viewHeight = window.innerHeight;
    var scrollTop = document.documentElement.scrollTop;
    for (let index = imgIndex; index < imgList.length; index++) {
      var img = imgList[index];
      var offsetTop = img.offsetTop;
      if (offsetTop < viewHeight + scrollTop) {
        var dataSrc = img.getAttribute("data-src");
        if (img.src !== dataSrc) {
          img.src = dataSrc;
        }
        imgIndex = index;
      }
    }
  }
}
