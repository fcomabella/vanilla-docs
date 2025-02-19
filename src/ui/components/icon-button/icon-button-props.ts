export interface IconButtonProps {
  iconName: string;
  onClick?: (this: GlobalEventHandlers, event: MouseEvent) => void;
}
