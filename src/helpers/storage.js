import '../providers/indexeddb';
import '../providers/webrtc';
import { record } from '../store/record';
import { createSyncedStore, doc, load as _load } from '../providers/syncedstore';

const recordVersion = "2";

record.value = createSyncedStore();

export const load = _load;

export const clear = () => {
  doc.destroy();
  record.value = null;
  localStorage.clear();
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

// Support pulling in original storage
if (localStorage.getItem('healthRecord')) {
  load(localStorage.getItem('healthRecord'));
  localStorage.removeItem('healthRecord');
}
