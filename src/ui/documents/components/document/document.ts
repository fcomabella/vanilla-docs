import { DocumentProps } from './document-props';
import { ElementConstructor } from '@ui/components/models';
import styles from './document.module.scss';
import { Div } from '@ui/components/div';

export const Document: ElementConstructor<DocumentProps, HTMLDivElement> = ({
  document,
}) => {
  const container = Div({ children: document, className: styles.listView });
  return container;
};
