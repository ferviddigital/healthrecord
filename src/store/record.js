import { reactive, watch, shallowRef } from 'vue';

/** @type {import('vue').ShallowRef<import('@syncedstore/core/types/doc').MappedTypeDescription<import('../typedefs').HealthRecord>>} */
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
