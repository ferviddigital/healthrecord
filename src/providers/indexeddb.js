import { IndexeddbPersistence } from 'y-indexeddb';
import { doc } from './syncedstore';
import { record } from '../store/record';
import { watch } from 'vue';

/** @type {IndexeddbPersistence | undefined} */
let iDBProvider;

watch(record, () => {
  if (record.value) {
    connect();
  } else {
    disconnect();
  }
});

const connect = () => {
  iDBProvider = new IndexeddbPersistence('health-record', doc);
}

const disconnect = () => {
  if (iDBProvider) {
    iDBProvider.clearData();
    iDBProvider.destroy()
  }
  iDBProvider = null;
}
