import { computed, reactive } from "vue";
import { record, store as recordStore } from './record';
import { v4 as uuidv4 } from 'uuid';

export const vitals = computed(() => {
  return record.value.vitals;
});

export const store = reactive({
  add({ name, description, unit, low, high }) {
    const vital = {
      id: uuidv4(),
      name,
      description,
      unit,
      low,
      high
    }

    const recordCopy = record.value;
    recordCopy.vitals.push(vital);

    recordStore.edit(recordCopy);
  },
  edit(vitalId, vitalObject) {
    const vital = vitals.value.find(vital => vital.id === vitalId);
    vital.name        = vitalObject.name;
    vital.description = vitalObject.description;
    vital.unit        = vitalObject.unit;
    vital.low         = vitalObject.low;
    vital.high        = vitalObject.high;

    const index = vitals.value.findIndex(vital => vital.id === vitalId);

    const recordCopy = record.value;
    recordCopy.vitals[index] = vital

    recordStore.edit(recordCopy);
  },
  delete(vitalId) {
    if (! confirm('Are you sure you want to delete this vital?') ) {
      return;
    }

    const vitalsCopy = vitals.value.filter(vital => vital.id !== vitalId);

    const recordCopy = record.value;
    recordCopy.vitals = vitalsCopy;

    recordStore.edit(recordCopy);
  }
});
