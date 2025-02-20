import { DivProps } from '@ui/shared/components/div/div-props';
import { ElementConstructor } from '@ui/shared/models';
import { populateChildren } from '@ui/shared/components/utils';
import classNames from 'classnames';

export const Div: ElementConstructor<DivProps, HTMLDivElement> = ({
  children,
  className,
}) => {
  const divElem = document.createElement('div');
  divElem.className = classNames(className);

  populateChildren(divElem, children);

  return divElem;
};
