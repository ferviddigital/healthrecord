import { record } from "../store/record";
import { computed } from 'vue';
import * as Vue from 'vue';
import { enableVueBindings, getYjsDoc, syncedStore } from '@syncedstore/core';
import { connect as webRTCConnect, disconnect as webRTCDisconnect } from "../providers/webrtc";
import { connect as iDBConnect, disconnect as iDBDisconnect } from "../providers/indexeddb";

enableVueBindings(Vue);

const recordVersion = "2";

const docShape = {
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

const yDoc = computed(() => {
  return getYjsDoc(record.value);
});

const connectProviders = () => {
  const indexedDBConnection = iDBConnect(yDoc.value);

  indexedDBConnection.on('synced', () => {
    webRTCConnect(record.value.id, yDoc.value)
  });
}

const disconnectProviders = () => {
  iDBDisconnect();
  webRTCDisconnect();
}

/**
 * Imports HealthRecord data into a SyncedStore
 * 
 * @param {string} recordData Stringified HealthRecord data
 * 
 * @returns {import("@syncedstore/core/types/doc").MappedTypeDescription<import("@syncedstore/core/types/doc").DocTypeDescription>}
 */
const importRecord = (recordData) => {
  const recordSyncedStore = syncedStore(docShape);

  /** @type {import("../typedefs").HealthRecord} */
  const importedRecord = JSON.parse(recordData);

  recordSyncedStore.version.insert(0, recordVersion);
  recordSyncedStore.firstName.insert(0, importedRecord.firstName);
  recordSyncedStore.lastName.insert(0, importedRecord.lastName);
  recordSyncedStore.people.push(...importedRecord.people);
  recordSyncedStore.vitals.push(...importedRecord.vitals);
  recordSyncedStore.measurements.push(...importedRecord.measurements);

  migrate(importedRecord, recordSyncedStore);

  return recordSyncedStore;
}

/**
 * 
 * @param {import("../typedefs").HealthRecord} importedRecord 
 * @param {import("@syncedstore/core/types/doc").MappedTypeDescription<import("@syncedstore/core/types/doc").DocTypeDescription>} syncedRecordStore 
 */
const migrate = (importedRecord, recordSyncedStore) => {
  if (! importedRecord.version || importedRecord.version <= 1) {
    recordSyncedStore.id.insert(0, crypto.randomUUID());
  } else {
    recordSyncedStore.id.insert(0, importedRecord.id);
  }
}

/**
 * Load HealthRecord data from stringified JSON
 * 
 * @param {string} recordData Record JSON stringified
 */
export const load = (recordData) => {
  disconnectProviders();
  record.value = importRecord(recordData);
  connectProviders();
}

export const clear = () => {
  disconnectProviders()
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

if (localStorage.getItem('healthRecord')) {
  // Support pulling in original storage
  load(localStorage.getItem('healthRecord'));
  localStorage.removeItem('healthRecord');
} else if (localStorage.getItem('isActive')) {
  record.value = syncedStore(docShape);
  connectProviders();
}