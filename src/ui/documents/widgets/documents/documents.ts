import { ElementConstructor } from '@ui/shared/models';
import { DocumentsProps } from './documents-props';
import { Div } from '@ui/shared/components/div';
import { Document } from '@ui/documents/components/document';
import styles from './documents.module.scss';
import { ColumnTitleBar } from '@ui/documents/components/column-title-bar';

export const Documents: ElementConstructor<DocumentsProps, HTMLDivElement> = ({
  view,
}) => {
  const children: Array<HTMLElement> = [];
  let className = styles.listView;

  if (view === 'list') {
    children.push(ColumnTitleBar({}));
  }

  if (view === 'grid') {
    className = styles.gridView;
  }

  children.push(
    ...Array(4)
      .fill(undefined)
      .map((_, index) =>
        Document({
          document: {
            name: `Document ${index + 1}`,
            version: index.toString(),
            attachments: ['Attachment 1', 'Attachment 2'],
            contributors: ['Contributor 1', 'Contributor 2'],
          },
          view,
        })
      )
  );

  const elem = Div({
    children,
    className,
  });

  return elem;
};
