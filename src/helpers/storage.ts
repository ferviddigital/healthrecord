import { HealthRecordSyncedStore, record } from '@store/record';
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
  record.value = undefined;
  record.value = createSyncedStore();
};

export const create = (person: { firstName: string, lastName: string, sex: string, dob: string }) => {
  const record: HealthRecord = {
    id: crypto.randomUUID(),
    version: recordVersion,
    user: {
      firstName: person.firstName,
      lastName: person.lastName,
      preferences: {
        webRTC: {
          enabled: false,
          signalerUrl: undefined,
        },
      },
    },
    people: [
      {
        ...person,
        id: crypto.randomUUID(),
      },
    ],
    vitals: [],
    measurements: [],
    notes: [],
  };
  load(JSON.stringify(record));
};

/**
 * @param {string} recordData Record JSON stringified
 */
export const load = (recordData: string) => {
  const recordObject = JSON.parse(recordData);
  if ('state' in recordObject) {
    importState(recordObject);
  } else {
    importRecord(recordObject);
  }
};

/**
 * Imports HealthRecord data into a SyncedStore, extracts doc, and applies to existing as Doc update
 */
const importRecord = (recordData: HealthRecord) => {
  if (!record.value) return;
  record.value.version.insert(0, recordVersion);
  record.value.people.push(...recordData.people);
  record.value.vitals.push(...recordData.vitals);
  record.value.measurements.push(...recordData.measurements);

  migrate(recordData, record.value);
};

/**
 * Import state from Yjs Doc Uint8Array state
 */
const importState = (recordData: { type: string; state: string; prefs: PersonPreferences }) => {
  const state = recordData.state;
  const update = Buffer.from(state, 'base64');
  applyUpdate(doc, update);

  setTimeout(() => {
    migrateState();
  }, 100);
};

/**
 * Run migrations for older record versions
 */
const migrate = (importedRecord: HealthRecord, syncedStore: HealthRecordSyncedStore) => {
  if (!importedRecord.version || Number(importedRecord.version) <= 1) {
    syncedStore.id.insert(0, crypto.randomUUID());
  } else {
    syncedStore.id.insert(0, importedRecord.id);
  }

  if (!importedRecord.version || Number(importedRecord.version) < 3) {
    syncedStore.user.firstName = importedRecord.firstName;
    syncedStore.user.lastName = importedRecord.lastName;
    syncedStore.user.preferences = { webRTC: { enabled: false, signalerUrl: undefined } };
  } else {
    syncedStore.user.firstName = importedRecord.user.firstName;
    syncedStore.user.lastName = importedRecord.user.lastName;
    syncedStore.user.preferences = importedRecord.user.preferences;
  }
};

const migrateState = () => {
  if (!record.value) return;
  if (!record.value.user.firstName) {
    record.value.user.preferences = {
      webRTC: {
        enabled: false,
        signalerUrl: undefined,
      },
    };
  }
};

// Support pulling in original storage
const localStorageHealthRecord = localStorage.getItem('healthRecord');
if (localStorageHealthRecord) {
  load(localStorageHealthRecord);
  localStorage.removeItem('healthRecord');
}
