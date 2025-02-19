import { Button } from '@ui/components/button';
import { IconButtonProps } from './icon-button-props';
import { ElementConstructor } from '@ui/components/models';
import { Icon } from '@ui/components/icon/icon';
import styles from './icon-button.module.scss';

export const IconButton: ElementConstructor<
  IconButtonProps,
  HTMLButtonElement
> = ({ iconName, onClick }) => {
  const icon = Icon({ iconName });
  const button = Button({
    children: icon,
    onClick,
    className: styles.iconButton,
  });

  return button;
};
