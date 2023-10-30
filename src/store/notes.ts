import { removeNote as removeMeasurementNote } from '@store/measurements';
import { record } from '@store/record';
import { computed } from 'vue';

/** All Note objects */
export const notes = computed(() => {
  if (!record.value) throw new Error('Record does not exist.');
  return record.value.notes || [];
});

/** All Note objects sorted from newest to oldest by `date` */
export const sorted = computed(() => {
  return notes.value.toSorted((a, b) => b.date - a.date);
});

/**
 * Create Note
 * @returns {string} New Note ID
 */
export const create = ({ date, text, personId, measurementId }: PartialNote): string => {
  if (!record.value) throw new Error('Record does not exist.');
  if (!date) throw new Error('Note must have a date.');
  if (!text) throw new Error('Note must have text.');
  if (!personId) throw new Error('Note must have an associated person.');

  const note: Note = {
    id: crypto.randomUUID(),
    created: Date.now(),
    date,
    text,
    personId,
    measurementId,
  };

  record.value.notes.push(note);
  return note.id;
};

/**
 * Update Note
 */
export const update = ({ id, text, date, measurementId }: PartialNote) => {
  if (!record.value) throw new Error('Record does not exist.');
  if (!date) throw new Error('Note must have a date.');
  if (!text) throw new Error('Note must have text.');

  const index = record.value.notes.findIndex(note => note.id === id);

  if (index === -1) throw new Error(`Could not find Note with ID: ${id}.`);

  record.value.notes[index].date = date;
  record.value.notes[index].text = text;
  record.value.notes[index].measurementId = measurementId;
  record.value.notes[index].updated = Date.now();
};

/**
 * Destroy Note
 * @param {string} id - Note ID
 */
export const destroy = (id: string) => {
  if (!record.value) throw new Error('Record does not exist.');

  if (!confirm('Are you sure you want to delete this Note?')) {
    return;
  }

  const index = record.value.notes.findIndex(note => note.id === id);

  if (index === -1) throw new Error(`Could not find Note with ID: ${id}.`);

  const note = record.value.notes[index];

  // Update associated Measurement if measurementId exists
  if (note.measurementId) {
    removeMeasurementNote(note.id);
  }

  record.value.notes.splice(index, 1);
};
