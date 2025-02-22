import { Template } from '@config/router/models/template';
import { NewDocument } from '@ui/documents/widgets/new-document/new-document';
import { Header } from '@ui/shared/components/header';
import { Main } from '@ui/shared/components/main/main';

export const newDocument: Template = ({ router }) => {
  const main = Main({
    children: [Header({ children: 'New document' }), NewDocument({ router })],
  });

  return main;
};
