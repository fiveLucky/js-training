onmessage = function name(e) {
  this.postMessage("you said '" + e.data + "'");
};
