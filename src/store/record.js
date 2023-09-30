import { reactive, watch, shallowRef } from 'vue';

/** @type {ShallowRef<import("@syncedstore/core/types/doc").MappedTypeDescription<{id: string, firstName: string, lastName: string, people: import('../typedefs').Person[], vitals: import('../typedefs').Vital[], measurements: import('../typedefs').Measurement[]}>>} */
export const record = shallowRef();

/**
 * Record store
 * 
 * @since 0.1.0
 */
export const store  = reactive({

  record,

  isActive: false,

  downloadable() {
    const exportable = this.record.toJSON();
    exportable.type = 'healthRecord';
    return exportable;
  }
});

watch(record, (value) => {
  if (value) {
    store.isActive = true;
    localStorage.setItem('isActive', true);
  } else {
    store.isActive = false;
    localStorage.removeItem('isActive');
  }
});
