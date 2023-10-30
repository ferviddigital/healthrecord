type Vital = {
  id: string;
  name: string;
  description?: string;
  unit: string;
  low?: number;
  high?: number;
};

type PartialVital = Partial<Vital>;

type VitalFormProps = PartialVital;

type VitalFormEmits = FormItemEmittable<PartialVital>;

type VitalChartRange = {
  unit: import('dayjs').ManipulateType;
  length: number;
  quantity: number;
  abbreviation: string;
  title: string;
};

type VitalSortBy = 'date' | 'alpha';
