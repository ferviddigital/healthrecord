import { computed, reactive } from "vue";
import { record, store as recordStore } from "./record";

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
    const recordCopy = record.value;
    recordCopy.people.push(person);

    recordStore.update(recordCopy);
  },

  /**
   * Update Person
   * 
   * @param {string} personId 
   * @param {import("../typedefs").Person} personObject 
   */
  update(personId, personObject) {
    const person = people.value.find(person => person.id === personId);

    if (! person) throw new Error(`Could not find person with ID: ${personId}.`);

    person.firstName  = personObject.firstName;
    person.lastName   = personObject.lastName;
    person.sex        = personObject.sex;
    person.dob        = personObject.dob;

    const index = people.value.findIndex(person => person.id === personId);

    const recordCopy = record.value;
    recordCopy.people[index] = person

    recordStore.update(recordCopy);
  },

  /**
   * Delete Person
   * 
   * @param {string} personId 
   */
  delete(personId) {
    if (! confirm('Are you sure you want to delete this person?') ) {
      return;
    }

    const peopleCopy = people.value.filter(person => person.id !== personId);

    const recordCopy = record.value;
    recordCopy.people = peopleCopy;

    recordStore.update(recordCopy);
  }
});
