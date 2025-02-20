import { WithClass } from '@ui/components/models';

export interface IconButtonProps extends WithClass {
  label: string;
  iconName: string;
  onClick?: (this: GlobalEventHandlers, event: MouseEvent) => void;
}
