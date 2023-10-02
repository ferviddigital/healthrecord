import { IndexeddbPersistence } from 'y-indexeddb';

/** @type {IndexeddbPersistence | undefined} */
let iDBProvider;

/**
 * @param {import('yjs').Doc} doc Underlying yDoc for active HealthRecord
 * 
 * @returns {IndexeddbPersistence}
 */
export const connect = (doc) => {
  iDBProvider = new IndexeddbPersistence('health-record', doc);
  return iDBProvider;
}

export const disconnect = () => {
  if (iDBProvider) {
    iDBProvider.clearData();
    iDBProvider.destroy()
  }
  iDBProvider = null;
}