import { computed } from 'vue';
import { record } from '@stores/record';

/**
 * All tracked people
 *
 * @since 0.1.0
 */
export const people = computed(() => {
  if (!record.value) throw new Error('Record does not exist.');
  return record.value.people || [];
});

/**
 * Create Person
 * @returns {string} New Person ID
 */
export const create = ({ firstName, lastName, sex, dob }: PartialPerson): string => {
  if (!record.value) throw new Error('Record not found.');
  if (!firstName) throw new Error('Person must have a first name.');
  if (!lastName) throw new Error('Person must have a last name.');
  if (!sex) throw new Error('Person must have a sex.');
  if (!dob) throw new Error('Person must have a date of birth.');

  const person: Person = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    sex,
    dob,
  };

  record.value.people.push(person);
  return person.id;
};

/**
 * Update Person
 */
export const update = ({ id, firstName, lastName, sex, dob }: PartialPerson) => {
  if (!record.value) throw new Error('Record not found.');
  if (!id) throw new Error('Person must have an ID.');
  if (!firstName) throw new Error('Person must have a first name.');
  if (!lastName) throw new Error('Person must have a last name.');
  if (!sex) throw new Error('Person must have a sex.');
  if (!dob) throw new Error('Person must have a date of birth.');

  const index = record.value.people.findIndex(person => person.id === id);

  if (index === -1) throw new Error(`Could not find person with ID: ${id}.`);

  record.value.people[index].firstName = firstName;
  record.value.people[index].lastName = lastName;
  record.value.people[index].sex = sex;
  record.value.people[index].dob = dob;
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

  const index = record.value.people.findIndex(person => person.id === id);

  if (index === -1) throw new Error(`Could not find Person with ID: ${id}.`);

  record.value.people.splice(index, 1);
};

/**
 * Delete Measurements for a specific Person ID
 */
const deletePersonMeasurements = (personId: string) => {
  if (!record.value) return;
  record.value.measurements.slice().forEach(_ => {
    if (!record.value) return;

    const lastIndex = record.value.measurements.findLastIndex(
      measurement => measurement.personId === personId
    );

    if (lastIndex === -1) return;
    record.value.measurements.splice(lastIndex, 1);
  });
};
