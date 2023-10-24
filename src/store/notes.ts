import { computed } from 'vue';
import { record } from '@store/record';
import { removeNote as removeMeasurementNote } from '@store/measurements';

/** All Note objects */
export const notes = computed(() => {
  return record.value?.notes || [];
});

/** All Note objects sorted from newest to oldest by `date` */
export const sorted = computed(() => {
  return notes.value.toSorted((a, b) => b.date - a.date);
});

/**
 * Create Note
 */
export const create = (
  date: number,
  text: string,
  personId: string,
  measurementId?: string
): string => {
  if (!record.value) throw new Error('Record does not exist.');

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
export const update = (id: string, date: number, text: string, measurementId?: string) => {
  if (!record.value) throw new Error('Record does not exist.');

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
