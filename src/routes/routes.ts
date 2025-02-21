import { Routes } from '@config/router/models/routes';
import { root } from './root';
import { newDocument } from '@routes/new-document/new-document';

export const routes: Routes = [
  {
    path: '/',
    template: root,
  },
  {
    path: '/new-document',
    template: newDocument,
  },
];
