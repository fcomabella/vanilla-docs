import { Document } from '@core/documents/domain/models';

export const sortDocumentByCreatedAt = (a: Document, b: Document): number => {
  return a.CreatedAt.getTime() - b.CreatedAt.getTime();
};
