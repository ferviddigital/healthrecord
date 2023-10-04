import { getYjsDoc } from '@syncedstore/core';
import { encodeStateAsUpdate } from 'yjs';
import { watch, shallowRef } from 'vue';
import { Buffer } from 'buffer';

/** @type {import('vue').ShallowRef<import('@syncedstore/core/types/doc').MappedTypeDescription<import('../typedefs').HealthRecord>>} */
export const record = shallowRef();

export const downloadable = () => {
  const doc = getYjsDoc(record.value);
  const encodedState = encodeStateAsUpdate(doc);
  const state = Buffer.from(encodedState).toString('base64');
  const exportable = {
    state,
    type: 'healthRecord'
  }
  return exportable;
}

watch(record, (value) => {
  if (value) {
    localStorage.setItem('isActive', true);
  } else {
    localStorage.removeItem('isActive');
  }
});
