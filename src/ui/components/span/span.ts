import { ElementConstructor } from '@ui/components/models';
import { SpanProps } from './span-props';
import classNames from 'classnames';
import { populateChildren } from '@ui/components/utils';

export const Span: ElementConstructor<SpanProps, HTMLSpanElement> = ({
  children,
  className,
}) => {
  const span = document.createElement('span');
  span.className = classNames(className);

  populateChildren(span, children);

  return span;
};
