import { Document } from '@core/documents/domain/models';

export const sortDocumentsByTitle = (a: Document, b: Document): number => {
  if (a.Title < b.Title) {
    return -1;
  }

  if (a.Title > b.Title) {
    return 1;
  }

  return 0;
};
