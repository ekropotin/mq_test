importScripts('../dao-universal.js');

const dao = new this.Dao();

self.addEventListener('message', function (e) {
  const [storage, start, end] = e.data;
  dao.getValues(storage, start, end).then((records) => {
    let globalMax = records[0].v[0];
    let globalMin = records[0].v[0];
    const resultArray = [];
    records.forEach((record) => resultArray.push(...record.v));
    resultArray.forEach(v => {
      globalMax = v > globalMax ? v : globalMax;
      globalMin = v < globalMin ? v : globalMin;
    });
    postMessage({ result: 'ok', data: { resultArray, globalMin, globalMax } });
  });
}, false);
