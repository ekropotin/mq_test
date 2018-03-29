define(['dao-universal', 'webworkers', 'ui', 'chartDrawer'], (Dao, Webworkers, UI, Chart) => {
  return function () {
    const dao = new Dao();
    function fillDbIfEmpty (storageName, url) {
      return dao.hasData(storageName).then(result => {
        if (!result) {
          return Webworkers.fillDb(storageName, url);
        } else {
          return Promise.resolve();
        }
      });
    }

    const chart = new Chart('graph');

    UI.init((state) => {
      console.log('New ui state: ' + state.data + ' ' + state.startYear + ' ' + state.endYear);
      let store, url;
      if (state.data === 'temp') {
        store = dao.STORE_TEMPERATURE;
        url = location.origin + '/data/temperature.json';
      } else {
        store = dao.STORE_PRECIPITATION;
        url = location.origin + '/data/precipitation.json';
      }
      fillDbIfEmpty(store, url).then(() => {
        const options = { store, start: state.startYear, end: state.endYear, canvasWidth: chart.getEffectiveWidth() };
        Webworkers.getGraphicsData(options).then((data) => {
          if (!UI.checkState(state)) {
            console.warn('Ui state already changed. Ignore drawing.');
          } else {
            chart.drawChart(data.result, { min: data.min, max: data.max, total: data.total });
          }
        });
      });
    });
  };
});
