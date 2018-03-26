define(['dao-universal', 'webworkers', 'ui'], (Dao, Webworkers, UI) => {
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
    fillDbIfEmpty(dao.STORE_TEMPERATURE, location.origin + '/data/temperature.json').then(() => {
      const test = 1;
    });

    Webworkers.getGraphicsData(dao.STORE_TEMPERATURE, '1881', '2006').then((data) => {
      const test = 1;
    });

    UI.init((state) => {
      console.log('New ui state: ' + state.data + ' ' + state.startYear + ' ' + state.endYear);
    });
  };
});
