import { Document } from '@core/documents/domain/models';
import { DocumentsRepositoryFactory } from '@core/documents/domain/ports';
import { DOCUMENTS_BASE_URL } from '@core/documents/infrastructure/constants';
import { DocumentResponse } from '@core/documents/infrastructure/models';
import { isDocumentsResponse } from '@core/documents/infrastructure/type-guards/is-documents-response';
import {
  fetchDocumentsFromLocalStorage,
  saveDocument,
} from '@core/shared/infrastructure/utils/local-storage-documents';

export const documentResponseToDocument = (
  documentResponse: DocumentResponse
): Document => ({
  Attachments: documentResponse.Attachments,
  Contributors: documentResponse.Contributors,
  CreatedAt: new Date(documentResponse.CreatedAt),
  ID: documentResponse.ID,
  Title: documentResponse.Title,
  UpdatedAt: new Date(documentResponse.UpdatedAt),
  Version: documentResponse.Version,
});

export const documentToDocumentResponse = (
  document: Document
): DocumentResponse => ({
  Attachments: document.Attachments,
  Contributors: document.Contributors,
  CreatedAt: document.CreatedAt.toISOString(),
  ID: document.ID,
  Title: document.Title,
  UpdatedAt: document.UpdatedAt.toISOString(),
  Version: document.Version,
});

export const RestDocumentsRepository: DocumentsRepositoryFactory = ({
  fetchFn,
}) => {
  return {
    getDocuments: async (): Promise<Array<Document>> => {
      const responses = await Promise.all([
        fetchFn(DOCUMENTS_BASE_URL),
        fetchDocumentsFromLocalStorage(),
      ]);

      const response = responses.flat();

      if (!isDocumentsResponse(response)) {
        throw new Error('Server has sent invalid data');
      }

      return response.map((dto) => documentResponseToDocument(dto));
    },

    saveDocument: async (document): Promise<void> => {
      const documentResponse = documentToDocumentResponse(document);
      saveDocument(documentResponse);
    },
  };
};
