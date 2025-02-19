import { ElementConstructor } from '@ui/components/models';
import { OptionsBarProps } from '@ui/components/options-bar/options-bar-props';
import styles from './options-bar.module.scss';
import { Div } from '@ui/components/div';
import { IconButton } from '@ui/components/icon-button/icon-button';
import classNames from 'classnames';

export const OptionsBar: ElementConstructor<
  OptionsBarProps,
  HTMLDivElement
> = ({ router, searchParams, view }) => {
  const sortSelectorContainer = Div({
    children: 'Sort by',
  });

  const listButton = IconButton({
    iconName: 'view_list',
    className: classNames({ [styles.active]: view === 'list' }),
    onClick: () => {
      if (view === 'grid') {
        searchParams.set('view', 'list');
        router.navigate('/', searchParams);
      }
    },
  });
  const gridButton = IconButton({
    iconName: 'view_module',
    className: classNames({ [styles.active]: view === 'grid' }),
    onClick: () => {
      if (view === 'list') {
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
