import { DocumentsRepository } from '@core/documents/domain/ports/documents-repository';
import { DocumentsRepositoryFactory } from '@core/documents/domain/ports/documents-repository-factory';

export const getDocumentsMock = vi.fn<DocumentsRepository['getDocuments']>();

export const DocumentsRepositoryMock = vi.fn<DocumentsRepositoryFactory>(
  () => ({
    getDocuments: getDocumentsMock,
  })
);
