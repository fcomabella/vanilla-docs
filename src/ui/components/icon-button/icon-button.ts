import { Button } from '@ui/components/button';
import { IconButtonProps } from './icon-button-props';
import { ElementConstructor } from '@ui/components/models';
import { Icon } from '@ui/components/icon/icon';
import styles from './icon-button.module.scss';
import classNames from 'classnames';

export const IconButton: ElementConstructor<
  IconButtonProps,
  HTMLButtonElement
> = ({ label, iconName, onClick, className }) => {
  const icon = Icon({ iconName });
  const button = Button({
    children: icon,
    onClick,
    className: classNames(styles.iconButton, className),
  });
  button.setAttribute('aria-label', label);

  return button;
};
