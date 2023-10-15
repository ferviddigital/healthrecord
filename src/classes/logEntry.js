import { people } from "../store/people";
import { vitals } from "../store/vitals"
import { notes } from "../store/notes";

export class LogEntry {

  /** @type {Object} */
  routeParams

  /**
   * 
   * @param {string} personId - The ID of the {@link Person} associated with this log entry.
   */
  constructor(personId) {
    this.personId = personId;
    this.objectId = this.personId;
    this.date = Date.now();
    this.routeName = 'Person'
    this.routeParams = {
      personId: this.objectId
    }
  }

  /** @type {number} */
  date;

  /** @type {string} */
  objectType;

  /** @type {string} */
  iconName;

  /** @type {string} */
  objectId;

  get person() {
    return people.value.find(person => person.id === this.personId);
  }

  get personName() {
    return this.person.firstName
  }

  get route() {
    return {
      name: this.routeName,
      params: this.routeParams
    }
  }

  get note() {
    return null
  }
}

export class MeasurementLogEntry extends LogEntry {

  /**
   * Create LogEntry from {@link Measurement}
   * @param {import("../typedefs").Measurement} measurement - The {@link Measurement} associated with this log entry.
   */
  constructor(measurement) {
    super(measurement.personId);
    this.measurement = measurement;
    this.vitalId    = this.measurement.vitalId;
    this.objectId   = this.vitalId;
    this.date       = this.measurement.created || this.measurement.date;
    this.objectType = `${this.vital.name} measurement`;
    this.iconName   = 'DocumentChartBarIcon';
    this.routeName  = 'PersonVitalMeasurementUpdate';
    this.routeParams = {
      measurementId: this.measurement.id,
      vitalId: this.measurement.vitalId
    }
  }

  get vital() {
    return vitals.value.find(vital => vital.id === this.vitalId);
  }

  get note() {
    if (!this.measurement.noteId) return null;
    return notes.value.find(note => note.id === this.measurement.noteId)
  }
}

export class NoteLogEntry extends LogEntry {

  /**
   * Create LogEntry from {@link Note}
   * @param {import("../typedefs").Note} note - The {@link Note} associated with this log entry
   */
  constructor(note) {
    super(note.personId);
    this._note       = note;
    this.objectId   = note.id;
    this.date       = note.created;
    this.objectType = 'note';
    this.icon       = 'DocumentTextIcon'
    this.routeName  = 'PersonNoteUpdate'
    this.routeParams= {
      noteId: note.id,
    }
  }

  get note() {
    return this._note;
  }
}