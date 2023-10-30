type Measurement = {
  id: string;
  created: number;
  updated?: number;
  value: number;
  date: number;
  personId: string;
  vitalId: string;
  noteId?: string;
};

type PartialMeasurement = Partial<Measurement>;

type MeasurementFormProps = PartialMeasurement;

type MeasurementFormEmits = FormItemEmittable<PartialMeasurement>;
