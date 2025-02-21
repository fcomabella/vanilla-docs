import { LabelProps } from '@ui/shared/components/label/label-props';
import { populateChildren } from '@ui/shared/components/utils';
import { ElementConstructor } from '@ui/shared/models';

export const Label: ElementConstructor<LabelProps, HTMLLabelElement> = ({
  children,
  label,
  className,
}) => {
  const labelElem = document.createElement('label');

  populateChildren(labelElem, children);
  labelElem.prepend(label);

  if (className) {
    labelElem.className = className;
  }

  return labelElem;
};
