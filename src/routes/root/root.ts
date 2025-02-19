import { Template } from '@config/router/models/template';
import { Header } from '@ui/components/header';
import { Main } from '@ui/components/main/main';
import { OptionsBar } from '@ui/components/options-bar';
import { Documents } from '@ui/documents/widgets/documents';
import styles from './root.module.scss';

export const root: Template = ({ router }) => {
  const header = Header({
    type: 'h1',
    children: 'Documents',
    className: styles.header,
  });
  const optionsBar = OptionsBar({ router });
  const documentContainer = Documents({});

  const main = Main({
    children: [header, optionsBar, documentContainer],
    className: styles.main,
  });

  return main;
};
