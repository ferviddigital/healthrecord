/**
 * @typedef {import("@syncedstore/core/types/doc").MappedTypeDescription<HealthRecordDocType>} HealthRecordSyncedStore
 */

/**
 * @typedef {object} HealthRecordDocType
 * @property {"text"}           id
 * @property {"text"}           version
 * @property {"text"}           firstName
 * @property {"text"}           lastName
 * @property {HealthRecordUser} user The {@link HealthRecordUser} associated with this record.
 * @property {Person[]}         people
 * @property {Vital[]}          vitals
 * @property {Measurement[]}    measurements
 * @property {Note[]}           notes
 */

/**
 * @typedef {object} HealthRecord
 * @property {string}           id
 * @property {string}           version
 * @property {HealthRecordUser} user
 * @property {Person[]}         people
 * @property {Vital[]}          vitals
 * @property {Measurement[]}    measurements
 * @property {Note[]}           notes
 * 
 * @deprecated Since version "3". Use `user.firstName` instead.
 * @property {string} firstName
 * @property {string} lastName
 */

/**
 * @typedef {object} HealthRecordUser
 * @property {string}             firstName
 * @property {string}             lastName
 * @property {PersonPreferences}  preferences
 */

/**
 * @typedef {object} PersonPreferences
 * @property {WebRTCPreference} webRTC
 */

/**
 * @typedef {object} WebRTCPreference
 * @property {boolean}  enabled
 * @property {string}   [signalerUrl]
 */

/**
 * @typedef {object} Person
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} sex
 * @property {string} dob
 */

/**
 * @typedef {object} Vital
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} unit
 * @property {number} [low]
 * @property {number} [high]
 */

/**
 * @typedef {object} Measurement
 * @property {string} id
 * @property {number} created
 * @property {number} [updated]
 * @property {number} value
 * @property {number} date
 * @property {string} personId  - The ID of the {@link Person} associated with this record.
 * @property {string} vitalId   - The ID of the {@link Vital} associated with this record.
 * @property {string} [noteId]  - The ID of the {@link Note} associated with this record.
 */

/**
 * @typedef {object} Note
 * @property {string} id
 * @property {number} created
 * @property {number} [updated]
 * @property {string} text
 * @property {number} date
 * @property {string} personId        - The ID of the {@link Person} associated with this record.
 * @property {string} [measurementId] - The ID of the {@link Measurement} associated with this record.
 */

/**
 * @typedef {{unit: import("dayjs").UnitType, length: number, quantity?: number, abbreviation?: string, title?: string}} VitalChartRange
 */

/**
 * @typedef {{value: number, date: number, vitalId: string, noteText?: string}} MeasurementPayload
 */

/**
 * @typedef {{date: number, text: string, measurementId?: string}} NotePayload
 */

export {}
