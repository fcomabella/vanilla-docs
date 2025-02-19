import { Template } from '@config/router/models/template';
import { Header } from '@ui/components/header';
import { Main } from '@ui/components/main/main';
import { OptionsBar } from '@ui/components/options-bar';
import { Documents } from '@ui/documents/widgets/documents';
import styles from './root.module.scss';
import { DocumentView } from '@ui/documents/models';
import { isDocumentView } from '@ui/documents/type-guards';

export const root: Template = ({ router, searchParams }) => {
  const paramsView = searchParams.get('view');

  if (paramsView !== null && !isDocumentView(paramsView)) {
    searchParams.delete('view');
    router.navigate('/', searchParams);
  }

  let view: DocumentView = 'list';

  if (isDocumentView(paramsView)) {
    view = paramsView;
  }

  const main = Main({
    children: [
      Header({
        type: 'h1',
        children: 'Documents',
        className: styles.header,
      }),
      OptionsBar({ router, searchParams, view }),
      Documents({ view }),
    ],
    className: styles.main,
  });

  return main;
};
