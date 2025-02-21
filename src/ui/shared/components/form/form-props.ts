import { WithChildren, WithClass } from '@ui/shared/models';

export interface FormProps extends WithChildren, WithClass {
  id: string;
  onSubmit: (this: HTMLFormElement, event: SubmitEvent) => void;
}
