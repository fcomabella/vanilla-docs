import { Div } from '@ui/shared/components/div';
import styles from './documents-error.module.scss';

export const LoadingDocumentsError = Div({
  children: 'There was an error loading documents',
  className: styles.documentsError,
});
