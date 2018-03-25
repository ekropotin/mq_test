define([], () => {
  return {
    runWorker (workerName) {
      return new Promise((resolve, reject) => {
        const worker = new Worker(`js/workers/${workerName}.js`);

        worker.addEventListener('message', function (e) {
          if (e.data.result === 'ok') {
            resolve();
          } else {
            reject(e.data.errMessage);
          }
        }, false);
      });
    }
  };
});
