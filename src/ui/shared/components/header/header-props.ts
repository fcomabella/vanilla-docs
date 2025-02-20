import { WithChildren, WithClass } from '@ui/shared/models';

export interface HeaderProps extends WithChildren, WithClass {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
