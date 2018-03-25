importScripts('https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js');

require(['../dao', '../http'], function (Dao, Http) {
  const dao = new Dao();
  Http.get(location.origin + '/data/temperature.json').then(data => {
    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch (e) {
      self.postMessage({ result: 'error', errMessage: 'Parse error' });
    }

    const resultMap = new Map();
    // Lets assume that data comes in sorted order. So we don't care about sorting
    parsed.forEach(item => {
      const year = item.t.split('-')[0];
      if (resultMap.get(year)) {
        resultMap.get(year).push(item.v);
      } else {
        resultMap.set(year, []);
      }
    });
    dao.fillDb(dao.STORE_TEMPERATURE, resultMap).then(() => {
      postMessage({ result: 'ok' });
    });
  });
});
