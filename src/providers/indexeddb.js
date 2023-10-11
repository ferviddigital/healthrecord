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

  migrate();
}

const disconnect = () => {
  if (!iDBProvider) return;
  iDBProvider.clearData();
  iDBProvider.destroy()
  iDBProvider = null;
}

const migrate = () => {
  pullInPreferences();
}

/**
 * Handle old preferences
 */
const pullInPreferences = () => {
  if (localStorage.getItem('preferences')) {

    /** @type {import('../typedefs').PersonPreferences} */
    const prefs = JSON.parse(localStorage.getItem('preferences'));
  
    doc.getMap('user').set('firstName', record.value.firstName.toString());
    record.value.user.firstName = record.value.firstName.toString();
    record.value.user.lastName = record.value.lastName.toString();
    record.value.user.preferences = {
      webRTC: {
        enabled: prefs.webRTC.enabled,
        signalerUrl: prefs.webRTC.signalerUrl
      }
    }

    localStorage.removeItem('preferences');
  }
}
