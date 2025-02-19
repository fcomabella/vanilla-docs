import classNames from 'classnames';
import { MainProps } from './main-props';
import { ElementConstructor } from '@ui/components/models';
import { populateChildren } from '@ui/components/utils';

export const Main: ElementConstructor<MainProps> = ({
  children,
  className,
}) => {
  const elem = document.createElement('main');
  elem.className = classNames(className);
  populateChildren(elem, children);
  return elem;
};
