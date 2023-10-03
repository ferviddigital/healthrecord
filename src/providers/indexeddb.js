import { getYjsDoc } from '@syncedstore/core';
import { IndexeddbPersistence } from 'y-indexeddb';
import { record } from '../store/record';

/** @type {IndexeddbPersistence | undefined} */
let iDBProvider;

/**
 * @param {import('yjs').Doc} doc Underlying yDoc for active HealthRecord
 * 
 * @returns {IndexeddbPersistence}
 */
export const connect = () => {
  const doc = getYjsDoc(record.value);
  iDBProvider = new IndexeddbPersistence('health-record', doc);
}

export const disconnect = () => {
  if (iDBProvider) {
    iDBProvider.clearData();
    iDBProvider.destroy()
  }
  iDBProvider = null;
}