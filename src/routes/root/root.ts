import { Template } from '@config/router/models/template';
import { Header } from '@ui/components/header';
import { Main } from '@ui/components/main/main';
import { OptionsBar } from '@ui/components/options-bar';
import styles from './root.module.scss';

export const root: Template = ({ router }) => {
  const header = Header({
    type: 'h1',
    children: 'Documents',
    className: styles.header,
  });
  const optionsBar = OptionsBar({ router });

  const main = Main({
    children: [header, optionsBar],
    className: styles.main,
  });

  return main;
};
