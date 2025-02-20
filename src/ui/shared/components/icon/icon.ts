import { IconProps } from '@ui/shared/components/icon/icon-props';
import { ElementConstructor } from '@ui/shared/models';
import { Span } from '@ui/shared/components/span';
import classNames from 'classnames';

export const Icon: ElementConstructor<IconProps, HTMLSpanElement> = ({
  iconName,
  className,
}) =>
  Span({
    children: iconName,
    className: classNames('material-icons', className),
  });
