import { DocumentView } from '@ui/documents/models';

export const isDocumentView = (view: unknown): view is DocumentView =>
  view === 'grid' || view === 'list';
