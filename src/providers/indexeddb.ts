import { IndexeddbPersistence } from 'y-indexeddb';
import { doc } from './syncedstore';

/** @type {IndexeddbPersistence | undefined} */
var iDBProvider: IndexeddbPersistence | undefined = undefined;

const setupIDBDocListeners = () => {
  doc.on('destroy', async () => {
    if (!iDBProvider) return;
    await iDBProvider.clearData();
    iDBProvider = undefined;
    connect();
    setupIDBDocListeners();
  });
}

const connect = () => {
  if (iDBProvider) return;
  iDBProvider = new IndexeddbPersistence('health-record', doc);
}

connect();
setupIDBDocListeners();
