import { Document } from '@core/documents/domain/models';

export interface DocumentsRepository {
  getDocuments: () => Promise<Array<Document>>;
  saveDocument: (document: Document) => Promise<void>;
}
