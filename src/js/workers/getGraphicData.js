importScripts('../dao-universal.js');

function calcAverage (array) {
  let sum = 0;
  array.forEach(v => (sum += v));
  return sum / array.length;
}

function pushInMap (map, key, value) {
  if (!map.get(key)) {
    map.set(key, []);
  }
  map.get(key).push(value);
}

function group (array, groupSize) {
  const result = [];
  for (let i = 0; i < array.length; i += groupSize) {
    result.push(calcAverage(array.slice(i, i + groupSize)));
  }
  return result;
}

function groupByYear (records) {
  const result = [];
  const map = new Map();
  records.forEach(record => {
    const year = record.ym.split('-')[0];
    pushInMap(map, year, calcAverage(record.v));
  });
  map.forEach((values, year) => result.push({ ym: year, v: [calcAverage(values)] }));
  return result;
}

function calcMetrics (data) {
  let min = 0;
  let max = 0;
  let total = 0;
  data.forEach(item => {
    total += item.v.length;
    max = Math.max(...item.v, max);
    min = Math.min(...item.v, min);
  });
  return { min: precisionRound(min, 1), max: precisionRound(max, 1), total };
}

function precisionRound (number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

const dao = new this.Dao();

self.addEventListener('message', function (e) {
  const { store, start, end, canvasWidth } = e.data;
  dao.getValues(store, start, end).then((records) => {
    let result = [];
    // Estime size. No need to be accurate here. So lets every month have 30 days.
    let groupSize = Math.ceil(records.length * 30 / canvasWidth);
    if (groupSize > 1) {
      records.forEach(record => result.push({ ym: record.ym, v: group(record.v, groupSize) }));
    } else {
      result = records;
    }
    let metrics = calcMetrics(result);
    groupSize = Math.round(metrics.total / canvasWidth);
    if (canvasWidth - metrics.total < 60) {
      // Still too match values. Group by year
      result = groupByYear(result);
      metrics = calcMetrics(result);
    }

    postMessage({ result: 'ok', data: { result, min: metrics.min, max: metrics.max, total: metrics.total } });
  });
}, false);
