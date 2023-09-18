import { computed, reactive } from "vue";
import { record, store as recordStore } from './record';

/**
 * All recorded measurements
 * 
 * @since 0.1.0
 */
export const measurements = computed(() => {
  return record.value.measurements.sort((a, b) => b.date - a.date );
});

/**
 * Measurement store
 * 
 * @since 0.1.0
 */
export const store = reactive({
  add({ value, date, personId, vitalId }) {
    const measurement = {
      id: crypto.randomUUID(),
      value,
      date,
      personId,
      vitalId
    }

    const recordCopy = record.value;
    recordCopy.measurements.push(measurement);

    recordStore.edit(recordCopy);
  },
  edit(measurementId, measurementObject) {
    const measurement = measurements.value.find(measurement => measurement.id === measurementId);
    measurement.value     = measurementObject.value;
    measurement.date      = measurementObject.date;
    measurement.personId  = measurementObject.personId;
    measurement.vitalId   = measurementObject.vitalId;

    const index = measurements.value.findIndex(measurement => measurement.id === measurementId);

    const recordCopy = record.value;
    recordCopy.measurements[index] = measurement

    recordStore.edit(recordCopy);
  },
  delete(measurementId) {
    if (! confirm('Are you sure you want to delete this measurement?') ) {
      return;
    }

    const measurementsCopy = measurements.value.filter(measurement => measurement.id !== measurementId);

    const recordCopy = record.value;
    recordCopy.measurements = measurementsCopy;

    recordStore.edit(recordCopy);
  }
});
