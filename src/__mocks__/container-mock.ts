import { Document } from '@core/documents/domain/models';
import { DocumentsRepositoryFactory } from '@core/documents/domain/ports';
import { GetDocumentsController } from '@ui/documents/models';

export const documentsRepositoryMock = vi.fn<DocumentsRepositoryFactory>(
  () => ({
    getDocuments: vi.fn<() => Promise<Array<Document>>>(),
  })
);

export const getDocumentsControllerMock = vi.fn<GetDocumentsController>();

export const resolutions = {
  documentsRepository: documentsRepositoryMock,
  getDocumentsController: getDocumentsControllerMock,
};

export const resolveMock = vi.fn(
  (injection: keyof typeof resolutions) => resolutions[injection]
);

vi.mock('@config/container', () => ({
  container: {
    resolve: resolveMock,
  },
}));
