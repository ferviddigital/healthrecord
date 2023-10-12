import { record } from '../store/record';
import { createSyncedStore, doc } from '../providers/syncedstore';
import '../providers/indexeddb';
import '../providers/webrtc';
import { Buffer } from 'buffer';
import { applyUpdate } from 'yjs';

const recordVersion = '3';

record.value = createSyncedStore();

export const clear = () => {
  doc.destroy();
  localStorage.clear();
  record.value = null;
  record.value = createSyncedStore();
}

export const create = (person) => {
  /** @type {import('../typedefs').HealthRecord} */
  const record = {
    id:           crypto.randomUUID(),
    version:      recordVersion,
    user: {
      firstName: person.firstName,
      lastName: person.lastName,
      preferences: {
        webRTC: {
          enabled: false,
          signalerUrl: null
        }
      }
    },
    people:       [{
      ...person,
      id: crypto.randomUUID()
    }],
    vitals:       [],
    measurements: []
  }
  load(JSON.stringify(record));
}

/**
 * @param {string} recordData Record JSON stringified
 */
export const load = (recordData) => {
  const recordObject = JSON.parse(recordData);
  if ('state' in recordObject) {
    importState(recordObject);
  } else {
    importRecord(recordObject)
  }
}

/**
 * Imports HealthRecord data into a SyncedStore, extracts doc, and applies to existing as Doc update
 * @param {import('../typedefs').HealthRecord} recordData Stringified HealthRecord data
 */
const importRecord = (recordData) => {

  record.value.version.insert(0, recordVersion);
  record.value.people.push(...recordData.people);
  record.value.vitals.push(...recordData.vitals);
  record.value.measurements.push(...recordData.measurements);

  migrate(recordData, record.value);
}

/**
 * Import state from Yjs Doc Uint8Array state
 * @param {{type: string, state: string, prefs: import('../typedefs').PersonPreferences}} recordData 
 */
const importState = (recordData) => {
  const state = recordData.state;
  const update = Buffer.from(state, 'base64');
  applyUpdate(doc, update);

  setTimeout(() => {
    migrateState();
  }, 100);
}

/**
 * Run migrations for older record versions
 * @param {import("../typedefs").HealthRecord} importedRecord 
 * @param {import('../typedefs').HealthRecordSyncedStore} syncedStore 
 */
const migrate = (importedRecord, syncedStore) => {
  if (! importedRecord.version || Number(importedRecord.version) <= 1) {
    syncedStore.id.insert(0, crypto.randomUUID());
  } else {
    syncedStore.id.insert(0, importedRecord.id);
  }

  if (!importedRecord.version || Number(importedRecord.version) < 3) {
    // @ts-expect-error
    syncedStore.user.firstName   = importedRecord.firstName;
    // @ts-expect-error
    syncedStore.user.lastName    = importedRecord.lastName;
    syncedStore.user.preferences = { webRTC: { enabled:false, signalerUrl: null } };
  } else {
    syncedStore.user.firstName   = importedRecord.user.firstName;
    syncedStore.user.lastName    = importedRecord.user.lastName;
    syncedStore.user.preferences = importedRecord.user.preferences;
  }
}

const migrateState = () => {
  if (!record.value.user.firstName) {
    record.value.user.firstName = record.value.firstName.toString();
    record.value.user.lastName = record.value.lastName.toString();
    record.value.user.preferences = {
      webRTC: {
        enabled: false,
        signalerUrl: null
      }
    }
  }
}


// Support pulling in original storage
if (localStorage.getItem('healthRecord')) {
  load(localStorage.getItem('healthRecord'));
  localStorage.removeItem('healthRecord');
}
