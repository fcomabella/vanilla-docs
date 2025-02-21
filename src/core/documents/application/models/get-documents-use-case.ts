import { DocumentSort, Document } from '@core/documents/domain/models';

export type GetDocumentsUseCase = (
  sort?: DocumentSort
) => Promise<Array<Document>>;
