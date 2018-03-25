define(['dao', 'webworkers'], (Dao, Webworkers) => {
  return function () {
    const dao = new Dao();
    function runWorkerOnEmptyStorate (storageName, workerName) {
      return dao.hasData(storageName).then(result => {
        if (!result) {
          return Webworkers.runWorker(workerName);
        } else {
          return Promise.resolve();
        }
      });
    }
    runWorkerOnEmptyStorate(dao.STORE_TEMPERATURE, 'fillTempDb').then(() => {
      const test = 1;
    });
  };
});
