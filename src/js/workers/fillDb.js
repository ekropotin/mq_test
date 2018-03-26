importScripts('../dao-universal.js', '../http-universal.js');

const dao = new this.Dao();

self.addEventListener('message', function (e) {
  const [storage, url] = e.data;
  this.Http.get(url).then(data => {
    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch (e) {
      self.postMessage({ result: 'error', data: 'Parse error' });
    }

    const resultMap = new Map();
    // Lets assume that data comes in sorted order. So we don't care about sorting
    parsed.forEach(item => {
      const yearAndMonth = item.t.substr(0, 7);
      if (resultMap.get(yearAndMonth)) {
        resultMap.get(yearAndMonth).push(item.v);
      } else {
        resultMap.set(yearAndMonth, []);
      }
    });
    dao.fillDb(storage, resultMap).then(() => {
      postMessage({ result: 'ok' });
    });
  });
}, false);
