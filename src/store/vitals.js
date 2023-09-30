import { computed, reactive } from "vue";
import { record } from './record';

/**
 * All vitals
 * 
 * @since 0.1.0
 */
export const vitals = computed(() => {
  return record.value.vitals.toSorted((a,b) => a.name.localeCompare(b.name));
});

/**
 * Create heart rate sample vital
 * 
 * @since 0.1.2
 */
export const createHeartRateVital = () => {
  store.create({
    id: crypto.randomUUID(),
    name: 'Heart Rate',
    description: 'Heart beats per minute',
    unit: 'bpm',
    low: 59,
    high: 101
  });
}

/**
 * Create body weight sample vital
 * 
 * @since 0.1.2
 */
export const createBodyWeightVital = () => {
  store.create({
    id: crypto.randomUUID(),
    name: 'Weight',
    description: 'Body weight',
    unit: 'lbs',
    low: '',
    high: ''
  });
}

/**
 * Vital store
 * 
 * @since 0.1.0
 */
export const store = reactive({
  /**
   * Create Vital
   * 
   * @param {import("../typedefs").Vital} vital 
   */
  create(vital) {
    record.value.vitals.push(vital);
  },

  /**
   * Update Vital
   * 
   * @param {string} vitalId 
   * @param {import("../typedefs").Vital} vitalObject 
   */
  update(vitalId, vitalObject) {
    const index = record.value.vitals.findIndex(vital => vital.id === vitalId);

    if (index === -1) throw new Error(`Could not find vital with ID: ${vitalId}.`);

    record.value.vitals[index].name        = vitalObject.name;
    record.value.vitals[index].description = vitalObject.description;
    record.value.vitals[index].unit        = vitalObject.unit;
    record.value.vitals[index].low         = vitalObject.low;
    record.value.vitals[index].high        = vitalObject.high;
  },

  /**
   * Delete Vital
   * 
   * @param {string} vitalId ID of Vital to delete
   */
  delete(vitalId) {
    if (! confirm('Are you sure you want to delete this vital?') ) {
      return;
    }

    deleteVitalMeasurements(vitalId);
    const index = record.value.vitals.findIndex(vital => vital.id === vitalId);
    record.value.vitals.splice(index, 1);
  }
});

/**
 * Delete Measurements for a specific Vital ID
 * 
 * @param {string} vitalId ID of Vital to delete measurements for
 */
const deleteVitalMeasurements = (vitalId) => {
  record.value.measurements.slice().forEach( _ => {
    const lastIndex = record.value.measurements.findLastIndex(measurement => measurement.vitalId === vitalId);
    if (lastIndex === -1) return;
    record.value.measurements.splice(lastIndex, 1);
  });
}
