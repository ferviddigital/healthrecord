export type MeasurementCreateProps = {
  vitalId?: string;
  personId: string;
};

export interface MeasurementUpdateProps extends MeasurementCreateProps {
  measurementId: string;
}

export type MeasurementFormProps = {
  personId: string;
  vitalId?: string;
  value?: number;
  date?: number;
  noteText?: string;
  deletable?: boolean;
}

export type MeasurementFormEmits = {
  submit: [payload: MeasurementFormPayload];
  destroy: [];
  destroyNote: [];
}

export type MeasurementFormPayload = Omit<MeasurementFormProps,'deletable'> & Pick<Measurement,'noteId'|'date'|'value'>;
