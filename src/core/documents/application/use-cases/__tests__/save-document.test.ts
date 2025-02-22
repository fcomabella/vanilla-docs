import { SaveDocument } from '@core/documents/application/use-cases/save-document';
import { documentsRepositoryMock } from '@core/documents/domain/ports/__mocks__/documents-repository-mock';

describe('SaveDocument use case', () => {
  it('Should be a function', () => {
    expect(SaveDocument).toBeInstanceOf(Function);
  });

  it('Should return a function', () => {
    const saveDocument = SaveDocument({
      documentsRepository: documentsRepositoryMock,
    });
    expect(saveDocument).toBeInstanceOf(Function);
  });
});
