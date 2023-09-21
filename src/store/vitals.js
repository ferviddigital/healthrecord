import { computed, reactive } from "vue";
import { record, store as recordStore } from './record';

/**
 * All vitals
 * 
 * @since 0.1.0
 */
export const vitals = computed(() => {
  return record.value.vitals.sort((a,b) => a.name.localeCompare(b.name));
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
    const recordCopy = record.value;
    recordCopy.vitals.push(vital);

    recordStore.update(recordCopy);
  },

  /**
   * Update Vital
   * 
   * @param {string} vitalId 
   * @param {import("../typedefs").Vital} vitalObject 
   */
  update(vitalId, vitalObject) {
    const vital = vitals.value.find(vital => vital.id === vitalId);

    if (! vital) throw new Error(`Could not find vital with ID: ${vitalId}.`);

    vital.name        = vitalObject.name;
    vital.description = vitalObject.description;
    vital.unit        = vitalObject.unit;
    vital.low         = vitalObject.low;
    vital.high        = vitalObject.high;

    const index = vitals.value.findIndex(vital => vital.id === vitalId);

    const recordCopy = record.value;
    recordCopy.vitals[index] = vital

    recordStore.update(recordCopy);
  },

  /**
   * Delete Vital
   * 
   * @param {string} vitalId 
   */
  delete(vitalId) {
    if (! confirm('Are you sure you want to delete this vital?') ) {
      return;
    }

    const vitalsCopy = vitals.value.filter(vital => vital.id !== vitalId);

    const recordCopy = record.value;
    recordCopy.vitals = vitalsCopy;

    recordStore.update(recordCopy);
  }
});
