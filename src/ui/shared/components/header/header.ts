import { populateChildren } from '@ui/shared/components/utils';
import { HeaderProps } from './header-props';
import { ElementConstructor } from '@ui/shared/models/element-constructor';
import classNames from 'classnames';

export const Header: ElementConstructor<HeaderProps, HTMLHeadingElement> = ({
  children,
  type = 'h1',
  className,
}) => {
  const header = document.createElement(type);
  header.className = classNames(className);
  populateChildren(header, children);
  return header;
};
