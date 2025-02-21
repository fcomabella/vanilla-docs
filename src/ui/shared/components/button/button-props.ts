import { WithChildren } from '@ui/shared/models';

export interface ButtonProps extends WithChildren {
  className?: string;
  type?: HTMLButtonElement['type'];
  onClick?: (this: HTMLButtonElement, event: MouseEvent) => void;
  fullWidth?: boolean;
}
