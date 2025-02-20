import { Div } from '@ui/components/div';
import { IconButton } from '@ui/components/icon-button/icon-button';
import { ElementConstructor } from '@ui/components/models';
import classNames from 'classnames';
import { OptionsBarProps } from './options-bar-props';
import styles from './options-bar.module.scss';

export const OptionsBar: ElementConstructor<
  OptionsBarProps,
  HTMLDivElement
> = ({ router, searchParams, view }) => {
  const sortSelectorContainer = Div({
    children: 'Sort by',
  });

  const listButton = IconButton({
    label: 'View as list',
    iconName: 'view_list',
    className: classNames({ [styles.active]: view === 'list' }),
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
    className: classNames({ [styles.active]: view === 'grid' }),
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
