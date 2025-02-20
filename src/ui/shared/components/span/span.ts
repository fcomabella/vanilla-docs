import { ElementConstructor } from '@ui/shared/models';
import { SpanProps } from './span-props';
import classNames from 'classnames';
import { populateChildren } from '@ui/shared/components/utils';

export const Span: ElementConstructor<SpanProps, HTMLSpanElement> = ({
  children,
  className,
}) => {
  const span = document.createElement('span');
  span.className = classNames(className);

  populateChildren(span, children);

  return span;
};
