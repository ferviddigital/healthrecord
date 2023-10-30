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

type FormField = {
  name: string;
  type: string;
  placeholder?: string;
  currentValue?: string;
  classes?: string;
  blurCallback(newValue: string): void;
};

type FormItemEmittable<T> = {
  submit: [payload: T];
  destroy: [];
};

declare module 'file-saver';
