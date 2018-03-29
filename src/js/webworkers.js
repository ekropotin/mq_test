define([], () => (() => {
  const activeWorkers = new Map();

  function runWorker (workerName, argsArray) {
    return new Promise((resolve, reject) => {
      const workerListener = (e) => {
        if (e.data.result === 'ok') {
          resolve(e.data.data);
        } else {
          reject(new Error(e.data.data));
        }
        e.target.removeEventListener('message', workerListener);
      };

      let worker;
      if (activeWorkers.get(workerName)) {
        worker = activeWorkers.get(workerName);
      } else {
        worker = new Worker(`js/workers/${workerName}.js`);
        activeWorkers.set(workerName, worker);
      }

      worker.postMessage(argsArray);
      worker.addEventListener('message', workerListener, false);
    });
  }

  return {
    fillDb (dbName, remoteUrl) {
      return runWorker('fillDb', [dbName, remoteUrl]);
    },

    getGraphicsData (options) {
      return runWorker('getGraphicData', options);
    }
  };
})());
