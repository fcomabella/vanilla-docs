import { Template } from '@config/router/models/template';
import { Header } from '@ui/shared/components/header';
import { Main } from '@ui/shared/components/main/main';
import { OptionsBar } from '@ui/documents/components/options-bar';
import { Documents } from '@ui/documents/widgets/documents';
import styles from './root.module.scss';
import { DocumentSort, DocumentView } from '@ui/documents/models';
import { isDocumentView } from '@ui/documents/type-guards';
import { isDocumentSort } from '@ui/documents/type-guards/is-document-sort';

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
      Header({
        type: 'h1',
        children: 'Documents',
        className: styles.header,
      }),
      OptionsBar({ router, searchParams, view, sort }),
      Documents({ view, sort }),
    ],
    className: styles.main,
  });

  return main;
};
