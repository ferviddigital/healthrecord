import { IndexeddbPersistence } from 'y-indexeddb';
import { Doc } from 'yjs';

/** @type {IndexeddbPersistence | undefined} */
let iDBProvider;

/**
 * @param {Doc} yDoc Underlying yDoc for active HealthRecord
 * 
 * @returns {IndexeddbPersistence}
 */
export const connect = (yDoc) => {
  iDBProvider = new IndexeddbPersistence('health-record', yDoc);
  return iDBProvider;
}

export const disconnect = () => {
  if (iDBProvider) {
    iDBProvider.clearData();
  }
  iDBProvider = null;
}