import {
  Document as DocumentViewModel,
  DocumentSort,
} from '@ui/documents/models';

export type GetDocumentsController = (
  sort: DocumentSort
) => Promise<Array<DocumentViewModel>>;
