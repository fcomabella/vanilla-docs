import { Div } from '@ui/components/div';
import { ElementConstructor } from '@ui/components/models';
import styles from './column-title-bar.module.scss';

export const ColumnTitleBar: ElementConstructor<
  Record<string, never>,
  HTMLDivElement
> = () => {
  const nameColumn = Div({ children: 'Name', className: styles.nameColumn });
  const contributorsColumn = Div({
    children: 'Contributors',
    className: styles.contributorsColumn,
  });
  const attachmentsColumn = Div({
    children: 'Attachments',
    className: styles.attachmentsColumn,
  });

  const columnTitleBar = Div({
    children: [nameColumn, contributorsColumn, attachmentsColumn],
    className: styles.columnTitleBar,
  });

  return columnTitleBar;
};
