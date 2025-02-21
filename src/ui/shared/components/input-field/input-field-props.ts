export interface InputFieldProps {
  name: string;
  type?: HTMLInputElement['type'];
  fullWidth?: boolean;
  autocomplete?: HTMLInputElement['autocomplete'];
  value?: string;
  id?: string;
}
