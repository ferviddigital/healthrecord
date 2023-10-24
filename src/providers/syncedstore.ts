import { Doc } from 'yjs';
import syncedStore from '@syncedstore/core';
import { enableVueBindings } from '@syncedstore/core';
import * as Vue from 'vue';
import { record } from '../store/record';
import { DocTypeDescription } from '@syncedstore/core/types/doc';

enableVueBindings(Vue);

export var doc = new Doc();

export const setupDocListeners = () => {
  
  doc.on('update', () => {
    if (!record.value) return;

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

export type HealthRecordDocType = DocTypeDescription & {
  id: 'text';
  version: 'text';
  user: HealthRecordUser;
  people: Person[];
  vitals: Vital[];
  measurements: Measurement[];
  notes: Note[];
};

const shape: HealthRecordDocType = {
  id: 'text',
  version: 'text',
  user: {} as HealthRecordUser,
  people: [],
  vitals: [],
  measurements: [],
  notes: []
}

export const createSyncedStore = () => {
  return syncedStore(shape, doc);
}
