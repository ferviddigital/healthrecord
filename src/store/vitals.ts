import { computed } from 'vue';
import { record } from '@store/record';

/**
 * All vitals
 */
export const vitals = computed(() => {
  return record.value?.vitals.toSorted((a, b) => a.name.localeCompare(b.name)) || [];
});

/**
 * Create heart rate sample vital
 */
export const createHeartRateVital = () => {
  create({
    id: crypto.randomUUID(),
    name: 'Heart Rate',
    description: 'Heart beats per minute',
    unit: 'bpm',
    low: 59,
    high: 101,
  });
};

/**
 * Create body weight sample vital
 */
export const createBodyWeightVital = () => {
  create({
    id: crypto.randomUUID(),
    name: 'Weight',
    description: 'Body weight',
    unit: 'lbs',
    low: undefined,
    high: undefined,
  });
};

/**
 * Create Vital
 */
export const create = (vital: Vital) => {
  if (!record.value) return;

  record.value.vitals.push(vital);
};

/**
 * Update Vital
 */
export const update = (vitalId: string, vitalObject: Vital) => {
  if (!record.value) return;

  const index = record.value.vitals.findIndex(vital => vital.id === vitalId);

  if (index === -1) throw new Error(`Could not find vital with ID: ${vitalId}.`);

  record.value.vitals[index].name = vitalObject.name;
  record.value.vitals[index].description = vitalObject.description;
  record.value.vitals[index].unit = vitalObject.unit;
  record.value.vitals[index].low = vitalObject.low;
  record.value.vitals[index].high = vitalObject.high;
};

/**
 * Delete Vital
 */
export const destroy = (id: string) => {
  if (!record.value) return;

  if (!confirm('Are you sure you want to delete this vital?')) {
    return;
  }

  deleteVitalMeasurements(id);

  const index = record.value.vitals.findIndex(vital => vital.id === id);

  if (index === -1) throw new Error(`Could not find Vital with ID: ${id}.`);

  record.value.vitals.splice(index, 1);
};

/**
 * Delete Measurements for a specific Vital ID
 */
const deleteVitalMeasurements = (id: string) => {
  if (!record.value) return;

  record.value.measurements.slice().forEach(() => {
    if (!record.value) return;

    const lastIndex = record.value.measurements.findLastIndex(
      measurement => measurement.vitalId === id
    );

    if (lastIndex === -1) return;

    record.value.measurements.splice(lastIndex, 1);
  });
};
