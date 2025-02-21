import { Template } from '@config/router/models/template';
import { Main } from '@ui/shared/components/main/main';

export const newDocument: Template = () => {
  const main = Main({
    children: 'New document',
  });

  return main;
};
