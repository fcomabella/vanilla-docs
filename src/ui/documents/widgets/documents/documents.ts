import { ElementConstructor } from '@ui/shared/models';
import { DocumentsProps } from './documents-props';
import { Div } from '@ui/shared/components/div';
import styles from './documents.module.scss';
import { ColumnTitleBar } from '@ui/documents/components/column-title-bar';
import { container } from '@config/container';
import { Document } from '@ui/documents/components/document';
import { LoadingDocumentsError } from '@ui/documents/components/loading-documents-error';
import { LoadingDocuments } from '@ui/documents/components/loading-documents';
import { populateChildren } from '@ui/shared/components/utils';

export const Documents: ElementConstructor<DocumentsProps, HTMLDivElement> = ({
  view,
  sort,
}) => {
  const controller = container.resolve('getDocumentsController');

  let className = styles.listView;

  let titleBarElem: HTMLDivElement | null = null;

  if (view === 'list') {
    titleBarElem = ColumnTitleBar({});
  }

  const loadingElem = LoadingDocuments;

  if (view === 'grid') {
    className = styles.gridView;
  }

  const rootElem = Div({
    children: [titleBarElem, loadingElem],
    className,
  });

  controller(sort)
    .then((documents) => {
      populateChildren(rootElem, [
        titleBarElem,
        ...documents.map((document) => Document({ document, view })),
      ]);
    })
    .catch(() => {
      populateChildren(rootElem, [titleBarElem, LoadingDocumentsError]);
    });

  return rootElem;
};
