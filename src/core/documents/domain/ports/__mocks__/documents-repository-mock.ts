import { DocumentsRepository } from '@core/documents/domain/ports/documents-repository';
import { DocumentsRepositoryFactory } from '@core/documents/domain/ports/documents-repository-factory';

export const getDocumentsMock = vi.fn<DocumentsRepository['getDocuments']>();
export const saveDocumentMock = vi.fn<DocumentsRepository['saveDocument']>();

export const documentsRepositoryMock: DocumentsRepository = {
  getDocuments: getDocumentsMock,
  saveDocument: saveDocumentMock,
};

export const DocumentsRepositoryFactoryMock = vi.fn<DocumentsRepositoryFactory>(
  () => documentsRepositoryMock
);
