import { computed, reactive } from "vue";
import { record, store as recordStore } from "./record";
import { v4 as uuidv4 } from 'uuid';

export const people = computed(() => {
  return record.value.people
});

export const store = reactive({
  add({ firstName, lastName, sex, dob }) {
    const recordCopy = record.value;
    
    recordCopy.people.push({
      id: uuidv4(),
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
