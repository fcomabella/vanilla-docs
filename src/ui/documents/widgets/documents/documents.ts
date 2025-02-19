import { ElementConstructor } from '@ui/components/models';
import { DocumentsProps } from './documents-props';
import { Div } from '@ui/components/div';
import { Document } from '@ui/documents/components/document';
import styles from './documents.module.scss';

export const Documents: ElementConstructor<
  DocumentsProps,
  HTMLDivElement
> = () => {
  const documents = Array(3)
    .fill(undefined)
    .map((_, index) =>
      Document({
        document: {
          name: `Document ${index + 1}`,
          version: index.toString(),
          attachments: ['Attachment 1', 'Attachment 2'],
          contributors: ['Contributor 1', 'Contributor 2'],
        },
      })
    );
  const elem = Div({ children: documents, className: styles.listView });

  return elem;
};
