import { DocumentSort } from '@ui/documents/models';

export const isDocumentSort = (sort: unknown): sort is DocumentSort =>
  sort === 'created' || sort === 'name' || sort === 'version';
