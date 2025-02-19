import { IconProps } from '@ui/components/icon/icon-props';
import { ElementConstructor } from '@ui/components/models';
import { Span } from '@ui/components/span';

export const Icon: ElementConstructor<IconProps, HTMLSpanElement> = ({
  iconName,
}) => Span({ children: iconName, className: 'material-icons' });
