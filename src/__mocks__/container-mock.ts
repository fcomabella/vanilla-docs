import { documentsRepositoryMock } from '@core/documents/domain/ports/__mocks__/documents-repository-mock';
import {
  GetDocumentsController,
  SaveDocumentController,
} from '@ui/documents/models';

export const getDocumentsControllerMock = vi.fn<GetDocumentsController>();
export const saveDocumentControllerMock = vi.fn<SaveDocumentController>();

export const resolutions = {
  documentsRepository: documentsRepositoryMock,
  getDocumentsController: getDocumentsControllerMock,
  saveDocumentController: saveDocumentControllerMock,
};

export const resolveMock = vi.fn(
  (injection: keyof typeof resolutions) => resolutions[injection]
);

vi.mock('@config/container', () => ({
  container: {
    resolve: resolveMock,
  },
}));
