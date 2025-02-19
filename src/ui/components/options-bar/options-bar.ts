import { ElementConstructor } from '@ui/components/models';
import { OptionsBarProps } from '@ui/components/options-bar/options-bar-props';
import styles from './options-bar.module.scss';
import { Div } from '@ui/components/div';
import { IconButton } from '@ui/components/icon-button/icon-button';

export const OptionsBar: ElementConstructor<
  OptionsBarProps,
  HTMLDivElement
> = () => {
  const sortSelectorContainer = Div({
    children: 'Sort by',
  });

  const listButton = IconButton({ iconName: 'view_list' });
  const gridButton = IconButton({ iconName: 'view_module' });

  const viewSelectionContainer = Div({
    children: [listButton, gridButton],
  });

  const optionsBarElem = Div({
    children: [sortSelectorContainer, viewSelectionContainer],
    className: styles.optionsBar,
  });

  return optionsBarElem;
};
