define([], () => {
  return (function () {
    const Http = {
      get (url) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.onload = () => resolve(xhr.responseText);
          xhr.onerror = () => reject(new Error(xhr.statusText));
          xhr.send();
        });
      }
    };

    return Http;
  }());
});
