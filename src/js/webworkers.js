define([], () => (() => {
  function runWorker (workerName, argsArray) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(`js/workers/${workerName}.js`);

      worker.postMessage(argsArray);

      worker.addEventListener('message', function (e) {
        if (e.data.result === 'ok') {
          resolve(e.data.data);
        } else {
          reject(new Error(e.data.data));
        }
      }, false);
    });
  }

  return {
    fillDb (dbName, remoteUrl) {
      return runWorker('fillDb', [dbName, remoteUrl]);
    },

    getGraphicsData (storage, start, end) {
      return runWorker('getGraphicData', [storage, start, end]);
    }
  };
})());
