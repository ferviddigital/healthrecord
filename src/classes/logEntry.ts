import { people } from '@stores/people';
import { vitals } from '@stores/vitals';
import { notes } from '@stores/notes';

export class LogEntry {
  date: number;

  objectId: string;

  personId: string;

  constructor(personId: string) {
    this.personId = personId;
    this.objectId = this.personId;
    this.date = Date.now();
  }

  get person() {
    return people.value.find(person => person.id === this.personId);
  }

  get personName() {
    return this.person?.firstName;
  }

  get note(): Note | undefined {
    return undefined;
  }

  get description(): string | undefined {
    return undefined;
  }
}

export class MeasurementLogEntry extends LogEntry {
  measurement: Measurement;

  constructor(measurement: Measurement) {
    super(measurement.personId);
    this.measurement = measurement;
    this.objectId = this.measurement.id;
    this.date = this.measurement.date;
  }

  get vital() {
    return vitals.value.find(vital => vital.id === this.measurement.vitalId);
  }

  get note() {
    if (!this.measurement.noteId) return undefined;
    return notes.value.find(note => note.id === this.measurement.noteId);
  }

  get description() {
    return `${this.vital?.name} measurement`;
  }
}

export class NoteLogEntry extends LogEntry {
  #note: Note;

  constructor(note: Note) {
    super(note.personId);
    this.#note = note;
    this.objectId = note.id;
    this.date = note.date;
  }

  get description() {
    return 'note';
  }

  get note() {
    return this.#note;
  }
}
