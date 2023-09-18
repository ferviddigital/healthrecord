import { computed, reactive } from "vue";
import { record, store as recordStore } from "./record";

/**
 * All tracked people
 * 
 * @since 0.1.0
 */
export const people = computed(() => {
  return record.value.people
});

/**
 * People store
 * 
 * @since 0.1.0
 */
export const store = reactive({
  add({ firstName, lastName, sex, dob }) {
    const recordCopy = record.value;
    
    recordCopy.people.push({
      id: crypto.randomUUID(),
      firstName,
      lastName,
      sex,
      dob
    });

    recordStore.edit(recordCopy);
  },
  edit(personId, personObject) {
    const person = people.value.find(person => person.id === personId);
    person.firstName  = personObject.firstName;
    person.lastName   = personObject.lastName;
    person.sex        = personObject.sex;
    person.dob        = personObject.dob;

    const index = people.value.findIndex(person => person.id === personId);

    const recordCopy = record.value;
    recordCopy.people[index] = person

    recordStore.edit(recordCopy);
  },
  delete(personId) {
    if (! confirm('Are you sure you want to delete this person?') ) {
      return;
    }

    const peopleCopy = people.filter(person => person.id !== personId);

    const recordCopy = record.value;
    recordCopy.people = peopleCopy;

    recordStore.edit(recordCopy);
  }
});
