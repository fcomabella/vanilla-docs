import { Children } from '@ui/components/models';

export interface ButtonProps {
  children: Children;
  className?: string;
  type?: HTMLButtonElement['type'];
  onClick?: (this: GlobalEventHandlers, event: MouseEvent) => void;
}
