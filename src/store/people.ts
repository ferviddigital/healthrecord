import { computed } from 'vue';
import { record } from '@store/record';

/**
 * All tracked people
 *
 * @since 0.1.0
 */
export const people = computed(() => {
  return record.value?.people || [];
});

/**
 * Create Person
 */
export const create = (person: Person) => {
  if (!record.value) return;
  record.value.people.push(person);
};

/**
 * Update Person
 */
export const update = (personId: string, personObject: Person) => {
  if (!record.value) return;

  const index = record.value.people.findIndex((person) => person.id === personId);

  if (index === -1) throw new Error(`Could not find person with ID: ${personId}.`);

  record.value.people[index].firstName = personObject.firstName;
  record.value.people[index].lastName = personObject.lastName;
  record.value.people[index].sex = personObject.sex;
  record.value.people[index].dob = personObject.dob;
};

/**
 * Destroy Person
 */
export const destroy = (id: string) => {
  if (!record.value) return;

  if (!confirm('Are you sure you want to delete this person?')) {
    return;
  }

  deletePersonMeasurements(id);

  const index = record.value.people.findIndex((person) => person.id === id);

  if (index === -1) throw new Error(`Could not find Person with ID: ${id}.`);

  record.value.people.splice(index, 1);
};

/**
 * Delete Measurements for a specific Person ID
 */
const deletePersonMeasurements = (personId: string) => {
  if (!record.value) return;
  record.value.measurements.slice().forEach((_) => {
    if (!record.value) return;

    const lastIndex = record.value.measurements.findLastIndex(
      (measurement) => measurement.personId === personId
    );

    if (lastIndex === -1) return;
    record.value.measurements.splice(lastIndex, 1);
  });
};
