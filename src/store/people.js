import { computed, reactive } from "vue";
import { record } from "./record";

/**
 * All tracked people
 * 
 * @since 0.1.0
 */
export const people = computed(() => {
  return record.value.people;
});

/**
 * People store
 * 
 * @since 0.1.0
 */
export const store = reactive({
  /**
   * Create Person
   * 
   * @param {import("../typedefs").Person} person 
   */
  create(person) {
    record.value.people.push(person);
  },

  /**
   * Update Person
   * 
   * @param {string} personId 
   * @param {import("../typedefs").Person} personObject 
   */
  update(personId, personObject) {
    const index = record.value.people.findIndex(person => person.id === personId);

    if (index === -1) throw new Error(`Could not find person with ID: ${personId}.`);

    record.value.people[index].firstName  = personObject.firstName
    record.value.people[index].lastName   = personObject.lastName
    record.value.people[index].sex        = personObject.sex
    record.value.people[index].dob        = personObject.dob
  },

  /**
   * Delete Person
   * 
   * @param {string} personId ID of Person to delete
   */
  delete(personId) {
    if (! confirm('Are you sure you want to delete this person?') ) {
      return;
    }
    deletePersonMeasurements(personId);
    const index = record.value.people.findIndex(person => person.id === personId);
    record.value.people.splice(index, 1);
  }
});

/**
 * Delete Measurements for a specific Person ID
 * 
 * @param {string} personId ID of Person to delete measurements for
 */
const deletePersonMeasurements = (personId) => {
  record.value.measurements.slice().forEach( _ => {
    const lastIndex = record.value.measurements.findLastIndex(measurement => measurement.personId === personId);
    if (lastIndex === -1) return;
    record.value.measurements.splice(lastIndex, 1);
  });
}