export type PersonCreateProps = {
  personId: string;
};

export type PersonUpdateProps = PersonCreateProps;

export type PersonFormProps = {
  firstName?: string;
  lastName?: string;
  sex?: string;
  dob?: string;
  deletable?: boolean;
}

export type PersonFormEmits = {
  submit: [payload: Person];
  destroy: [];
}
