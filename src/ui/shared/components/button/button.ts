import { ElementConstructor } from '@ui/shared/models/element-constructor';
import { ButtonProps } from './button-props';
import styles from './button.module.scss';
import classNames from 'classnames';
import { populateChildren } from '@ui/shared/components/utils';

export const Button: ElementConstructor<ButtonProps, HTMLButtonElement> = ({
  children,
  type = 'button',
  className,
  onClick = null,
  fullWidth = false,
}) => {
  const button = document.createElement('button');

  populateChildren(button, children);

  button.type = type;
  button.className = classNames(
    styles.button,
    {
      [styles.fullWidth]: fullWidth,
    },
    className
  );
  button.onclick = onClick;

  return button;
};
