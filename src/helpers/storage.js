import { record } from '../store/record';
import { Doc } from 'yjs';
import * as Vue from 'vue';
import { enableVueBindings, syncedStore } from '@syncedstore/core';
import { connect as webRTCConnect, disconnect as webRTCDisconnect } from '../providers/webrtc';
import { connect as iDBConnect, disconnect as iDBDisconnect } from '../providers/indexeddb';
import { watch } from 'vue';
import { Y } from '@syncedstore/core';
import { Buffer } from 'buffer';
import '../store/preferences';

enableVueBindings(Vue);

localStorage.log = 'y-webrtc'

const recordVersion = "2";

const doc = new Doc();

/** @type {import('@syncedstore/core/types/doc').DocTypeDescription} */
const shape = {
  id: 'text',
  version: 'text',
  firstName: 'text',
  lastName: 'text',
  /** @type {import('../typedefs'.Person[])} */
  people: [],
  /** @type {import('../typedefs'.Vital[])} */
  vitals: [],
  /** @type {import('../typedefs'.Measurement[])} */
  measurements: []
}

const connectProviders = () => {
  webRTCConnect();
  iDBConnect();
}

const disconnectProviders = () => {
  iDBDisconnect();
  webRTCDisconnect();
}

/**
 * Imports HealthRecord data into a SyncedStore, extracts doc, and applies to existing as Doc update
 * 
 * @param {import('../typedefs').HealthRecord} recordData Stringified HealthRecord data
 */
const importRecord = (recordData) => {

  const newDoc = new Y.Doc();

  const recordSyncedStore = syncedStore(shape, newDoc);
  recordSyncedStore.version.insert(0, recordVersion);
  recordSyncedStore.firstName.insert(0, recordData.firstName);
  recordSyncedStore.lastName.insert(0, recordData.lastName);
  recordSyncedStore.people.push(...recordData.people);
  recordSyncedStore.vitals.push(...recordData.vitals);
  recordSyncedStore.measurements.push(...recordData.measurements);

  migrate(recordData, recordSyncedStore);

  const encoded = Y.encodeStateAsUpdate(newDoc);

  Y.applyUpdate(doc, encoded);
}

/**
 * Import state from Yjs Doc Uint8Array state
 * 
 * @param {{type: string, state: Uint8Array, prefs: import('../typedefs').PersonPreferences}} recordData 
 */
const importState = (recordData) => {
  const state = recordData.state;
  const update = Buffer.from(state, 'base64');
  Y.applyUpdate(doc, update);
}

/**
 * Run migrations for older record versions
 * @param {import("../typedefs").HealthRecord} importedRecord 
 * @param {import('@syncedstore/core/types/doc').MappedTypeDescription<import('../typedefs').HealthRecord>} syncedStore 
 */
const migrate = (importedRecord, syncedStore) => {
  if (! importedRecord.version || importedRecord.version <= 1) {
    syncedStore.id.insert(0, crypto.randomUUID());
  } else {
    syncedStore.id.insert(0, importedRecord.id);
  }
}

/**
 * Load HealthRecord data from stringified JSON
 * 
 * @param {string} recordData Record JSON stringified
 */
export const load = (recordData) => {
  const recordObject = JSON.parse(recordData);
  if ('state' in recordObject) {
    importState(recordObject);
  } else {
    importRecord(recordObject)
  }
  record.value = syncedStore(shape, doc);
}

export const clear = () => {
  disconnectProviders();
  doc.destroy();
  record.value = null;
}

export const create = (person) => {
  /** @type {import('../typedefs').HealthRecord} */
  const record = {
    id:           crypto.randomUUID(),
    version:      recordVersion,
    firstName:    person.firstName,
    lastName:     person.lastName,
    people:       [{
      ...person,
      id: crypto.randomUUID()
    }],
    vitals:       [],
    measurements: []
  }
  load(JSON.stringify(record));
}

watch(record, (value) => {
  if (value) {
    connectProviders();
  } else {
    disconnectProviders();
  }
});

if (localStorage.getItem('healthRecord')) {
  // Support pulling in original storage
  load(localStorage.getItem('healthRecord'));
  localStorage.removeItem('healthRecord');
} else if (localStorage.getItem('isActive')) {
  record.value = syncedStore(shape, doc);
}
