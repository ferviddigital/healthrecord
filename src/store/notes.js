import { computed } from "vue";
import { record } from './record';
import { removeNote as removeMeasurementNote } from "./measurements";

/** All Note objects */
export const notes = computed(() => {
  return record.value.notes;
});

/** All Note objects sorted from newest to oldest by `date` */
export const sorted = computed(() => {
  return notes.value.toSorted((a, b) => b.date - a.date );
});

/**
 * Create Note
 * @param {number} date             - Date of Note
 * @param {string} text             - Note text
 * @param {string} personId         - Associated {@link Person} ID
 * @param {string} [measurementId]  - Associated {@link Measurement} ID
 * @returns {string} Note ID
 */
export const create = (date, text, personId, measurementId) => {

  /** @type {import("../typedefs").Note} */
  const note = {
    id: crypto.randomUUID(),
    created: Date.now(),
    date,
    text,
    personId,
    measurementId
  }
  record.value.notes.push(note);

  return note.id;
}

/**
 * Update Note
 * @param {string} id               - Note ID
 * @param {number} date             - Date of Note
 * @param {string} text             - Note text
 * @param {string} [measurementId]  - Associated {@link Measurement} ID
 */
export const update = (id, date, text, measurementId) => {
  const index = record.value.notes.findIndex(note => note.id === id);

  if (index === -1) throw new Error(`Could not find Note with ID: ${id}.`);

  record.value.notes[index].date          = date;
  record.value.notes[index].text          = text;
  record.value.notes[index].measurementId = measurementId

  record.value.notes[index].updated = Date.now();
}

/**
 * Destroy Note
 * @param {string} id - Note ID
 */
export const destroy = (id) => {
  if (! confirm('Are you sure you want to delete this Note?') ) {
    return;
  }

  const index = record.value.notes.findIndex(note => note.id === id);
  const note = record.value.notes[index];

  // Update associated Measurement if measurementId exists
  if (note.measurementId) {
    removeMeasurementNote(note.id);
  }

  record.value.notes.splice(index, 1);
}
