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
 */

/**
 * @typedef {object} HealthRecord
 * @property {string}           id
 * @property {string}           version
 * @property {HealthRecordUser} user
 * @property {Person[]}         people
 * @property {Vital[]}          vitals
 * @property {Measurement[]}    measurements
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
 * @property {boolean}            enabled
 * @property {string | undefined} signalerUrl
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
 * @property {number} low
 * @property {number} high
 */

/**
 * @typedef {object} Measurement
 * @property {string} id
 * @property {number} value
 * @property {number} date
 * @property {string} personId
 * @property {string} vitalId
 */

/**
 * @typedef {("week" | "month" | "quarter" | "year" | "all")} VitalChartRange
 */

export {}
