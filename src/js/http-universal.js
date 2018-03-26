(function (global, exportedObject) {
  // This is universal module. So it can be imported in Webworker
  if (typeof define === 'function' && define.amd) {
    define(() => exportedObject);
  } else {
    global.Http = exportedObject;
  }
})(this, {
  get (url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(new Error(xhr.statusText));
      xhr.send();
    });
  }
});
