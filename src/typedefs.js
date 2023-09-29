/**
 * @typedef {object} HealthRecord
 * @property {string} id
 * @property {string} type
 * @property {number} version
 * @property {string} firstName
 * @property {string} lastName
 * @property {Person[]} people
 * @property {Vital[]} vitals
 * @property {Measurement[]} measurements
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

export {}
