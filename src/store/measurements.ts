import { computed } from 'vue';
import { record } from './record';
import { destroy as destroyNote } from './notes';
import type { MeasurementFormPayload } from 'src/types/measurement';

/** All Measurement objects */
export const measurements = computed(() => {
  return record.value?.measurements || [];
});

/** All Measurement objects sorted from newest to oldest by `date` */
export const sorted = computed(() => {
  return measurements.value.toSorted((a, b) => b.date - a.date);
});

/**
 * Create Measurement
 * @returns {string} Measurement ID
 */
export const create = ({ date, value, personId, vitalId, noteId }: MeasurementFormPayload): string => {
  if (!record.value) throw new Error('Record does not exist.');

  const measurement: Measurement = {
    id: crypto.randomUUID(),
    created: Date.now(),
    date,
    value,
    personId,
    vitalId,
    noteId,
  };
  record.value.measurements.push(measurement);

  return measurement.id;
};

/**
 * Update Measurement
 */
export const update = (id: string, date: number, value: number, noteId?: string) => {
  if (!record.value) throw new Error('Record does not exist.');

  const index = record.value.measurements.findIndex(measurement => measurement.id === id);

  if (index === -1) throw new Error(`Could not find Measurement with ID: ${id}.`);

  record.value.measurements[index].date = date;
  record.value.measurements[index].value = value;
  record.value.measurements[index].noteId = noteId;

  record.value.measurements[index].updated = Date.now();
};

/**
 * Destroy Measurement
 */
export const destroy = (id: string) => {
  if (!record.value) return;

  if (!confirm('Are you sure you want to delete this Measurement?')) {
    return;
  }

  const index = record.value.measurements.findIndex(measurement => measurement.id === id);

  if (index === -1) throw new Error(`Could not find Measurement with ID: ${id}.`);

  const measurement = record.value.measurements[index];

  // Destroy associated Note if noteId exists
  if (measurement.noteId) {
    destroyNote(measurement.noteId);
  }

  record.value.measurements.splice(index, 1);
};

/**
 * Disassociate Note from Measurement
 */
export const removeNote = (noteId: string) => {
  const measurement = measurements.value.find(measurement => measurement.noteId === noteId);
  if (!measurement) return;
  update(measurement.id, measurement.date, measurement.value, undefined);
};
