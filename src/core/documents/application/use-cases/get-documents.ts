import { GetDocumentsFactory } from '@core/documents/application/models';
import {
  sortDocumentByCreatedAt,
  sortDocumentsByTitle,
  sortDocumentsByVersion,
} from '@core/documents/application/utils';
import { Document, DocumentSort } from '@core/documents/domain/models';

const sortMethods: Record<DocumentSort, (a: Document, b: Document) => number> =
  {
    created: sortDocumentByCreatedAt,
    name: sortDocumentsByTitle,
    version: sortDocumentsByVersion,
  };

export const GetDocuments: GetDocumentsFactory = ({ documentsRepository }) => {
  return async (sort) => {
    const documents = await documentsRepository.getDocuments();

    return documents.sort(sortMethods[sort]);
  };
};
