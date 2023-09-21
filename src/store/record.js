import { computed, reactive } from 'vue';
import { store as peopleStore } from './people';

const recordVersion = 1;

/**
 * Browser stored health record
 * 
 * @type {import('vue').ComputedRef<import('../typedefs').Record>}
 * 
 * @since 0.1.0
 */
export const record = computed(() => {
  return store.record;
});

/**
 * Record store
 * 
 * @since 0.1.0
 */
export const store  = reactive({
  /** @type {import('../typedefs').Record} */
  record: JSON.parse(localStorage.getItem('healthRecord')),

  /**
   * Create Record
   * 
   * @param {*} param0 
   */
  create({ person }) {
    /** @type {import('../typedefs').Record} */
    const record = {
      type:         'healthRecord',
      version:      recordVersion,
      firstName:    person.firstName,
      lastName:     person.lastName,
      people:       [],
      vitals:       [],
      measurements: []
    }
    this.update(record);
    peopleStore.create(person);
  },

  /**
   * Update Record
   * 
   * @param {import('../typedefs').Record} record 
   */
  update(record) {
    record.updated = Date.now();
    localStorage.setItem('healthRecord', JSON.stringify(record));
    this.record = record
  },

  /**
   * Delete Record
   */
  delete() {
    this.record = null;
    localStorage.removeItem('healthRecord');
  }
});
