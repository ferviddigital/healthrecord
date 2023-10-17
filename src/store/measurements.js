import { computed } from "vue";
import { record } from './record';
import { destroy as destroyNote, notes } from "./notes";

/** All Measurement objects */
export const measurements = computed(() => {
  return record.value.measurements;
});

/** All Measurement objects sorted from newest to oldest by `date` */
export const sorted = computed(() => {
  return measurements.value.toSorted((a, b) => b.date - a.date );
});

/**
 * Create Measurement
 * @param {number} date     - Date of Measurement
 * @param {number} value    - Measurement value
 * @param {string} personId - Associated {@link Person} ID
 * @param {string} vitalId  - Associated {@link Vital} ID
 * @param {string} [noteId] - Associated {@link Note} ID
 * @returns {string}        - Measurement ID
 */
export const create = (date, value, personId, vitalId, noteId) => {

  /** @type {import("../typedefs").Measurement} */
  const measurement = {
    id: crypto.randomUUID(),
    created: Date.now(),
    date,
    value,
    personId,
    vitalId,
    noteId,
  }
  record.value.measurements.push(measurement);

  return measurement.id;
}

/**
 * Update Measurement
 * @param {string} id       - Measurement ID
 * @param {number} date     - Date of Measurement
 * @param {number} value    - Measurement value
 * @param {string} [noteId] - Associated {@link Note} ID
 */
export const update = (id, date, value, noteId) => {
  const index = record.value.measurements.findIndex(measurement => measurement.id === id);

  if (index === -1) throw new Error(`Could not find Measurement with ID: ${id}.`);

  record.value.measurements[index].date = date;
  record.value.measurements[index].value = value;
  record.value.measurements[index].noteId = noteId;

  record.value.measurements[index].updated = Date.now();
}

/**
 * Destroy Measurement
 * @param {string} id - Measurement ID
 */
export const destroy = (id) => {
  if (! confirm('Are you sure you want to delete this Measurement?') ) {
    return;
  }

  const index = record.value.measurements.findIndex(measurement => measurement.id === id);
  const measurement = record.value.measurements[index];

  // Destroy associated Note if noteId exists
  if (measurement.noteId) {
    destroyNote(measurement.noteId);
  }

  record.value.measurements.splice(index, 1);
}

/**
 * Disassociate Note from Measurement
 * @param {string} noteId - Associated {@link Note} ID
 */
export const removeNote = (noteId) => {
  const measurement = measurements.value.find(measurement => measurement.noteId === noteId);
  update(measurement.id, measurement.date, measurement.value, null);
}

measurements.value.forEach(measurement => {
  const noteIds = notes.value.map(note => note.id);

  if (!noteIds.includes(measurement.noteId)) {
    removeNote(measurement.noteId);
  }
})