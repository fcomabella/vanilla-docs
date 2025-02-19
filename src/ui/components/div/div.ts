import { DivProps } from '@ui/components/div/div-props';
import { ElementConstructor } from '@ui/components/models';
import { populateChildren } from '@ui/components/utils';
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
