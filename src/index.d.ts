interface FormField {
  name: string;
  type: string;
  placeholder?: string;
  currentValue?: string;
  classes?: string;
  blurCallback(newValue: string);
}
