import { record } from '@stores/record';
import { computed } from 'vue';

/**
 * All vitals
 */
export const vitals = computed(() => {
  if (!record.value) throw new Error('Record does not exist.');
  return record.value.vitals.toSorted((a, b) => a.name.localeCompare(b.name)) || [];
});

/**
 * Create heart rate sample vital
 */
export const createWellBeingVital = () => {
  create({
    id: crypto.randomUUID(),
    name: 'Well-being',
    description: 'General well-being on a scale fom 0-10.',
    unit: 'pts',
    low: 5,
    high: undefined,
  });
};

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
 * @returns {string} New Vital ID
 */
export const create = ({ name, description, unit, low, high }: PartialVital): string => {
  if (!record.value) throw new Error('Record not found.');
  if (!name) throw new Error('Vital must have a name.');
  if (!unit) throw new Error('Vital must have a unit of measurement.');

  const vital: Vital = {
    id: crypto.randomUUID(),
    name,
    description,
    unit,
    low,
    high,
  };

  record.value.vitals.push(vital);
  return vital.id;
};

/**
 * Update Vital
 */
export const update = ({ id, name, description, unit, low, high }: PartialVital) => {
  if (!record.value) throw new Error('Record not found.');
  if (!id) throw new Error('Vital must have an ID.');
  if (!name) throw new Error('Vital must have a name.');
  if (!unit) throw new Error('Vital must have a unit of measurement.');

  const index = record.value.vitals.findIndex(vital => vital.id === id);

  if (index === -1) throw new Error(`Could not find Vital with ID: ${id}.`);

  record.value.vitals[index].name = name;
  record.value.vitals[index].description = description;
  record.value.vitals[index].unit = unit;
  record.value.vitals[index].low = low;
  record.value.vitals[index].high = high;
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
