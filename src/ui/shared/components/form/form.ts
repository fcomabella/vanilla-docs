import { FormProps } from '@ui/shared/components/form/form-props';
import { populateChildren } from '@ui/shared/components/utils';
import { ElementConstructor } from '@ui/shared/models';
import classNames from 'classnames';

export const Form: ElementConstructor<FormProps, HTMLFormElement> = ({
  children,
  onSubmit,
  className,
  id,
}) => {
  const form = document.createElement('form');
  form.id = id;
  form.noValidate = true;
  form.className = classNames(className);

  form.addEventListener('submit', onSubmit);

  populateChildren(form, children);

  return form;
};
