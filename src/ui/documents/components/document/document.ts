import { Div } from '@ui/components/div';
import { ElementConstructor } from '@ui/components/models';
import { DocumentProps } from './document-props';
import styles from './document.module.scss';

export const Document: ElementConstructor<DocumentProps, HTMLDivElement> = ({
  document,
}) => {
  const nameElem = Div({ children: document.name, className: styles.name });
  const versionElem = Div({ children: `Version: ${document.version}` });
  const details = Div({
    children: [nameElem, versionElem],
    className: styles.details,
  });
  const contributors = Div({
    children: document.contributors.map((contributor) =>
      Div({ children: contributor })
    ),
    className: styles.contributors,
  });
  const attachments = Div({
    children: document.attachments.map((attachment) =>
      Div({ children: attachment })
    ),
    className: styles.attachments,
  });

  const container = Div({
    children: [details, contributors, attachments],
    className: styles.listView,
  });

  return container;
};
