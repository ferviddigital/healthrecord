import { computed, reactive } from "vue";
import { record } from './record';

/**
 * All recorded measurements
 * 
 * @since 0.1.0
 */
export const measurements = computed(() => {
  return [...record.value.measurements].sort((a, b) => b.date - a.date );
});

/**
 * Measurement store
 * 
 * @since 0.1.0
 */
export const store = reactive({
  /**
   * Create Measurement
   * 
   * @param {import("../typedefs").Measurement} measurement 
   */
  create(measurement) {
    record.value.measurements.push(measurement);
  },

  /**
   * Update Measurement
   * 
   * @param {string} measurementId 
   * @param {import("../typedefs").Measurement} measurementObject 
   */
  update(measurementId, measurementObject) {
    const index = measurements.value.findIndex(measurement => measurement.id === measurementId);

    if (index === -1) throw new Error(`Could not find measurement with ID: ${measurementId}.`);

    record.value.measurements[index].value     = measurementObject.value;
    record.value.measurements[index].date      = measurementObject.date;
    record.value.measurements[index].personId  = measurementObject.personId;
    record.value.measurements[index].vitalId   = measurementObject.vitalId;
  },

  /**
   * Delete Measurement
   * 
   * @param {string} measurementId 
   */
  delete(measurementId) {
    if (! confirm('Are you sure you want to delete this measurement?') ) {
      return;
    }

    const index = measurements.value.findIndex(measurement => measurement.id !== measurementId);
    record.value.measurements.splice(index, 1);
  }
});
