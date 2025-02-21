import { WithChildren } from '@ui/shared/models';

export interface ButtonProps extends WithChildren {
  className?: string;
  type?: HTMLButtonElement['type'];
  onClick?: (this: GlobalEventHandlers, event: MouseEvent) => void;
  fullWidth?: boolean;
}
