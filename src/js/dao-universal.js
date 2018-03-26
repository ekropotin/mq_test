(function (global, exportedObject) {
  // This is universal module. So it can be imported in Webworker
  if (typeof define === 'function' && define.amd) {
    define(() => exportedObject);
  } else {
    global.Dao = exportedObject;
  }
})(this, class {
  constructor () {
    const DB_VERSION = 1;
    const DB_NAME = 'weatherDatabase';

    this.STORE_TEMPERATURE = 'temperature';
    this.STORE_PRECIPITATION = 'precipitation';

    this.dbPromise = new Promise((resolve, reject) => {
      const indexedDb = indexedDB || window.indexedDB || window.mozIndexedDB ||
                                    window.webkitIndexedDB || window.msIndexedDB;
      if (!indexedDb) {
        reject(new Error("You browser doesn't support indexedDb"));
      }
      const dbRequest = indexedDB.open(DB_NAME, DB_VERSION);
      dbRequest.onerror = (error) => {
        console.error('Cant open DB: ' + error);
        reject(new Error(error));
      };
      dbRequest.onsuccess = e => resolve(e.target.result);
      dbRequest.onupgradeneeded = e => {
        const db = e.target.result;
        const tempStore = db.createObjectStore(this.STORE_TEMPERATURE, { keyPath: 'ym' });
        const presStore = db.createObjectStore(this.STORE_PRECIPITATION, { keyPath: 'ym' });
        const promise1 = new Promise(resolve => {
          tempStore.transaction.oncomplete = resolve;
        });
        const promise2 = new Promise(resolve => {
          presStore.transaction.oncomplete = resolve;
        });
        Promise.all([promise1, promise2]).then(() => resolve(db));
      };
    });
  }

  getObjectStore (storageName, mode) {
    return this.dbPromise.then(db => {
      const tx = db.transaction(storageName, mode);
      return tx.objectStore(storageName);
    });
  }

  hasData (storageName) {
    return new Promise(resolve => {
      this.getObjectStore(storageName, 'readonly').then(store => {
        store.openCursor().onsuccess = e => resolve(!!e.target.result);
      });
    });
  }

  fillDb (storageName, map) {
    return new Promise(resolve => {
      this.getObjectStore(storageName, 'readwrite').then(store => {
        for (let entry of map) {
          store.add({ ym: entry[0], v: entry[1] });
        }
        resolve();
      });
    });
  }

  getValues (storageName, startYear, endYear) {
    return new Promise((resolve, reject) => {
      const range = IDBKeyRange.bound(startYear + '-01', endYear + '-12');
      this.getObjectStore(storageName, 'readonly').then(store => {
        const result = [];
        store.openCursor(range).onsuccess = e => {
          const cursor = e.target.result;
          if (cursor) {
            result.push(cursor.value);
            cursor.continue();
          } else {
            resolve(result);
          }
        };
      });
    });
  }
});
