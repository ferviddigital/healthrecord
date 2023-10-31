type Person = {
  id: string;
  firstName: string;
  lastName: string;
  sex: string;
  dob: string;
};

type PartialPerson = Partial<Person>;

type PersonFormProps = PartialPerson;

type PersonFormEmits = FormItemEmittable<PartialPerson>;
