import { Template } from '@config/router/models/template';
import { OptionsBar } from '@ui/documents/components/options-bar';
import { DocumentSort, DocumentView } from '@ui/documents/models';
import { isDocumentView } from '@ui/documents/type-guards';
import { isDocumentSort } from '@ui/documents/type-guards/is-document-sort';
import { Documents } from '@ui/documents/widgets/documents';
import { NewDocumentNotification } from '@ui/documents/widgets/new-document-notification';
import { Button } from '@ui/shared/components/button';
import { Header } from '@ui/shared/components/header';
import { Main } from '@ui/shared/components/main/main';
import styles from './root.module.scss';

export const root: Template = ({ router, searchParams }) => {
  const paramsView = searchParams.get('view');
  const paramsSort = searchParams.get('sortBy');

  if (paramsView !== null && !isDocumentView(paramsView)) {
    searchParams.delete('view');
    router.navigate('/', searchParams);
  }

  let view: DocumentView = 'list';

  if (isDocumentView(paramsView)) {
    view = paramsView;
  }

  let sort: DocumentSort = 'name';

  if (isDocumentSort(paramsSort)) {
    sort = paramsSort;
  }

  const main = Main({
    children: [
      NewDocumentNotification({}),
      Header({
        type: 'h1',
        children: 'Documents',
      }),
      OptionsBar({ router, searchParams, view, sort }),
      Documents({ view, sort }),
      Button({
        children: 'New document',
        fullWidth: true,
        onClick: () => {
          router.navigate('/new-document');
        },
        className: styles.button,
      }),
    ],
  });

  return main;
};
