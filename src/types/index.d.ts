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

type HealthRecord = {
  id: string;
  version: string;
  user: HealthRecordUser;
  people: Person[];
  vitals: Vital[];
  measurements: Measurement[];
  notes: Note[];

  /** @deprecated - Use `user.firstName` */
  firstName?: string;
  /** @deprecated - Use `user.lastName` */
  lastName?: string;
};

type HealthRecordUser = {
  firstName: string;
  lastName: string;
  preferences: PersonPreferences;
};

type PersonPreferences = {
  webRTC: WebRTCPreference;
};

type WebRTCPreference = {
  enabled: boolean;
  signalerUrl?: string;
};

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  sex: string;
  dob: string;
};

type Vital = {
  id: string;
  name: string;
  description: string;
  unit: string;
  low?: number;
  high?: number;
};

type Note = {
  id: string;
  created: number;
  updated?: number;
  text: string;
  date: number;
  personId: string;
  measurementId?: string;
};

type FormField = {
  name: string;
  type: string;
  placeholder?: string;
  currentValue?: string;
  classes?: string;
  blurCallback(newValue: string): void;
};

type VitalChartRange = {
  unit: import("dayjs").ManipulateType,
  length: number,
  quantity: number,
  abbreviation: string,
  title: string
}

declare module 'file-saver';
