import { people } from "../store/people";
import { vitals } from "../store/vitals"
import { notes } from "../store/notes";

export class LogEntry {

  /**
   * 
   * @param {string} personId - The ID of the {@link Person} associated with this log entry.
   */
  constructor(personId) {
    this.personId = personId;
    this.objectId = this.personId;
  }

  /** @type {number} */
  date;

  /** @type {string} */
  objectId;

  get person() {
    return people.value.find(person => person.id === this.personId);
  }

  get personName() {
    return this.person.firstName;
  }

  get note() {
    return null;
  }

  get description() {
    return null;
  }
}

export class MeasurementLogEntry extends LogEntry {

  /**
   * Create LogEntry from {@link Measurement}
   * @param {import("../typedefs").Measurement} measurement - The {@link Measurement} associated with this log entry.
   */
  constructor(measurement) {
    super(measurement.personId);
    this.measurement  = measurement;
    this.objectId     = this.measurement.id;
    this.date         = this.measurement.created || this.measurement.date;
  }

  get vital() {
    return vitals.value.find(vital => vital.id === this.measurement.vitalId);
  }

  get note() {
    if (!this.measurement.noteId) return null;
    return notes.value.find(note => note.id === this.measurement.noteId)
  }

  get description() {
    return `${this.vital.name} measurement`;
  }
}

export class NoteLogEntry extends LogEntry {

  /** @type {import("../typedefs").Note} */
  #note

  /**
   * Create LogEntry from {@link Note}
   * @param {import("../typedefs").Note} note - The {@link Note} associated with this log entry
   */
  constructor(note) {
    super(note.personId);
    this.#note      = note;
    this.objectId   = note.id;
    this.date       = note.created;
  }

  get description() {
    return 'note';
  }

  get note() {
    return this.#note
  }
}