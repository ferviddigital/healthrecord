import { computed, reactive } from 'vue';
import { store as peopleStore } from './people';

const recordVersion = 1;

export const record = computed(() => {
  return store.record;
});

export const store  = reactive({
  record: JSON.parse(localStorage.getItem('healthRecord')),
  add({ person }) {
    const record = {
      type:         'healthRecord',
      version:      recordVersion,
      firstName:    person.firstName,
      lastName:     person.lastName,
      people:       [],
      vitals:       [],
      measurements: []
    }
    this.edit(record);
    peopleStore.add(person);
  },
  edit(record) {
    record.updated = Date.now();
    localStorage.setItem('healthRecord', JSON.stringify(record));
    this.record = record
  },
  delete() {
    this.record = null;
    localStorage.removeItem('healthRecord');
  }
});
