import { IndexeddbPersistence } from 'y-indexeddb';
import { doc } from './syncedstore';

/** @type {IndexeddbPersistence | undefined} */
let iDBProvider;

const setupIDBDocListeners = () => {
  doc.on('destroy', async () => {
    await iDBProvider.clearData();
    iDBProvider = null;
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
