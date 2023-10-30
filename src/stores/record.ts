import { getYjsDoc } from '@syncedstore/core';
import { encodeStateAsUpdate } from 'yjs';
import { shallowRef } from 'vue';
import { Buffer } from 'buffer';
import { MappedTypeDescription } from '@syncedstore/core/types/doc';
import { HealthRecordDocType } from 'src/providers/syncedstore';

export type HealthRecordSyncedStore = MappedTypeDescription<HealthRecordDocType>;

export const record = shallowRef<HealthRecordSyncedStore>();

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
