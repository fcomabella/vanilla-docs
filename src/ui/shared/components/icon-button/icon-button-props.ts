import { WithClass } from '@ui/shared/models';

export interface IconButtonProps extends WithClass {
  label: string;
  iconName: string;
  onClick?: (this: HTMLButtonElement, event: MouseEvent) => void;
}
