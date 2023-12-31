import { computed, ref, watch } from 'vue';
import { people } from '@stores/people';
import { measurements } from '@stores/measurements';
import { notes } from '@stores/notes';
import { MeasurementLogEntry, NoteLogEntry } from '../classes/logEntry';

export const selectedPersonId = ref(localStorage.getItem('selectedPersonId'));

export const selectedPerson = computed(() => {
  if (!selectedPersonId.value) throw new Error('There is no selected person ID.');
  const selectedPerson = people.value.find(person => person.id === selectedPersonId.value);
  if (!selectedPerson) throw new Error('There is no Person with that ID');
  return selectedPerson;
});

export const personMeasurements = computed(() => {
  return measurements.value.filter(measurement => measurement.personId === selectedPersonId.value);
});

export const sortedPersonMeasurements = computed(() => {
  return personMeasurements.value.toSorted((a, b) => b.date - a.date);
});

export const personNotes = computed(() => {
  return notes.value.filter(note => note.personId === selectedPersonId.value);
});

export const sortedPersonNotes = computed(() => {
  return personNotes.value.toSorted((a, b) => b.date - a.date);
});

export const personMeasurementLogEntries = computed(() => {
  return sortedPersonMeasurements.value.map(measurement => new MeasurementLogEntry(measurement));
});

const personNoteLogEntries = computed(() => {
  return sortedPersonNotes.value
    .filter(note => !note.measurementId)
    .map(note => new NoteLogEntry(note));
});

export const sortedPersonLogEntries = computed(() => {
  return [...personMeasurementLogEntries.value, ...personNoteLogEntries.value].toSorted(
    (a, b) => b.date - a.date
  );
});

watch(selectedPersonId, value => {
  if (value) {
    localStorage.setItem('selectedPersonId', value);
  } else {
    localStorage.removeItem('selectedPersonId');
  }
});
