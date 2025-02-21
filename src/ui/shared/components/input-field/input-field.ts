import { ElementConstructor } from '@ui/shared/models';
import classNames from 'classnames';
import { InputFieldProps } from './input-field-props';
import styles from './input-field.module.scss';

export const InputField: ElementConstructor<
  InputFieldProps,
  HTMLInputElement
> = ({
  name,
  type = 'text',
  fullWidth = false,
  autocomplete = 'off',
  value = '',
  id,
}) => {
  const inputElem = document.createElement('input');

  inputElem.type = type;
  inputElem.name = name;
  inputElem.autocomplete = autocomplete;
  inputElem.className = classNames(styles.field, {
    [styles.fullWidth]: fullWidth,
  });
  inputElem.value = value;

  if (id) {
    inputElem.id = id;
  }

  return inputElem;
};
