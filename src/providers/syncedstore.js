import { Doc } from 'yjs';
import syncedStore from '@syncedstore/core';
import { enableVueBindings } from '@syncedstore/core';
import * as Vue from 'vue';
import { record } from '../store/record';

enableVueBindings(Vue);

export var doc = new Doc();

export const setupDocListeners = () => {
  
  doc.on('update', () => {
    if (record.value.id.toString().length > 0) {
      localStorage.setItem('isActive', String(true));
    } else {
      localStorage.removeItem('isActive');
    }
  });
  
  doc.on('destroy', () => {
    doc = new Doc();
    setupDocListeners();
  });
}

setupDocListeners();

/** @type {import('../typedefs').HealthRecordDocType} */
const shape = {
  id: 'text',
  version: 'text',
  firstName: 'text',
  lastName: 'text',
  // @ts-expect-error
  user: {},
  people: [],
  vitals: [],
  measurements: []
}

export const createSyncedStore = () => {
  return syncedStore(shape, doc);
}
