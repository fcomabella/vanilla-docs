import { Div } from '@ui/shared/components/div';
import { ElementConstructor } from '@ui/shared/models';
import { DocumentProps } from './document-props';
import styles from './document.module.scss';
import classNames from 'classnames';

export const Document: ElementConstructor<DocumentProps, HTMLDivElement> = ({
  document,
  view,
}) => {
  const [language] = navigator.languages;
  const creationDate = new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(document.creationDate);

  const container = Div({
    children: [
      Div({
        children: [
          Div({ children: document.name, className: styles.name }),
          Div({ children: `Version: ${document.version}` }),
          Div({ children: `Created at: ${creationDate}` }),
        ],
        className: classNames({
          [styles.detailsListView]: view === 'list',
          [styles.detailsGridView]: view === 'grid',
        }),
      }),
      Div({
        children: document.contributors.map((contributor) =>
          Div({ children: contributor })
        ),
        className: classNames({
          [styles.contributorsListView]: view === 'list',
          [styles.contributorsGridView]: view === 'grid',
        }),
      }),
      Div({
        children: document.attachments.map((attachment) =>
          Div({ children: attachment })
        ),
        className: classNames({
          [styles.attachmentsListView]: view === 'list',
          [styles.attachmentsGridView]: view === 'grid',
        }),
      }),
    ],
    className: classNames(styles.base, {
      [styles.listView]: view === 'list',
      [styles.gridView]: view === 'grid',
    }),
  });

  return container;
};
