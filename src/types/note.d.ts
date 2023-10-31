type Note = {
  id: string;
  created: number;
  updated?: number;
  text: string;
  date: number;
  personId: string;
  measurementId?: string;
};

type PartialNote = Partial<Note>;

type NoteFormProps = PartialNote;

type NoteFormEmits = FormItemEmittable<PartialNote>;
