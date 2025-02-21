import { Div } from '@ui/shared/components/div';
import styles from './loading-documents.module.scss';

export const LoadingDocuments = Div({
  children: 'Loading documents...',
  className: styles.loadingDocuments,
});
