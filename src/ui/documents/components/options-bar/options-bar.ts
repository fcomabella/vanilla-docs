import { SortSelect } from '@ui/documents/components/sort-select';
import { Div } from '@ui/shared/components/div';
import { IconButton } from '@ui/shared/components/icon-button/icon-button';
import { ElementConstructor } from '@ui/shared/models';
import classNames from 'classnames';
import { OptionsBarProps } from './options-bar-props';
import styles from './options-bar.module.scss';

export const OptionsBar: ElementConstructor<
  OptionsBarProps,
  HTMLDivElement
> = ({ router, searchParams, view, sort }) => {
  const sortSelectorContainer = Div({
    children: [
      Div({ children: 'Sort by:' }),
      SortSelect({ router, searchParams, sort }),
    ],
    className: styles.sortSelectorContainer,
  });

  const listButton = IconButton({
    label: 'View as list',
    iconName: 'view_list',
    className: classNames({
      [styles.active]: view === 'list',
      [styles.inactive]: view !== 'list',
    }),
    onClick: () => {
      if (view !== 'list') {
        searchParams.set('view', 'list');
        router.navigate('/', searchParams);
      }
    },
  });
  const gridButton = IconButton({
    label: 'View as grid',
    iconName: 'view_module',
    className: classNames({
      [styles.active]: view === 'grid',
      [styles.inactive]: view !== 'grid',
    }),
    onClick: () => {
      if (view !== 'grid') {
        searchParams.set('view', 'grid');
        router.navigate('/', searchParams);
      }
    },
  });

  const viewSelectionContainer = Div({
    children: [listButton, gridButton],
  });

  const optionsBarElem = Div({
    children: [sortSelectorContainer, viewSelectionContainer],
    className: styles.optionsBar,
  });

  return optionsBarElem;
};
