import { DocumentResponseMother } from '@core/documents/infrastructure/models/__mocks__/document-response-mother';
import { DocumentsResponseMother } from '@core/documents/infrastructure/models/__mocks__/documents-response-mother';
import {
  documentMapper,
  RestDocumentsRepository,
} from '@core/documents/infrastructure/ports/rest-documents-repository';

describe('RestDocumentsRepository', () => {
  const fetchFnMock = vi.fn<(url: string) => Promise<unknown>>();

  beforeEach(() => {
    fetchFnMock.mockClear();
  });

  it('Should be a function', () => {
    expect(RestDocumentsRepository).toBeInstanceOf(Function);
  });

  it('Should return a documents repository', () => {
    const repository = RestDocumentsRepository({
      fetchFn: fetchFnMock,
    });

    expect(repository.getDocuments).toBeInstanceOf(Function);
  });

  describe('getDocuments method', () => {
    it('Should return the documents', async () => {
      const documents = DocumentsResponseMother();
      const expected = documents.map((document) => documentMapper(document));

      fetchFnMock.mockResolvedValueOnce(documents);

      const repository = RestDocumentsRepository({
        fetchFn: fetchFnMock,
      });

      const retrieved = await repository.getDocuments();

      expect(retrieved).toStrictEqual(expected);
    });

    it('Should throw for a malformed documents response', async () => {
      const document = DocumentResponseMother();
      document.ID = 'not an uuid';

      fetchFnMock.mockResolvedValueOnce([document]);

      const repository = RestDocumentsRepository({
        fetchFn: fetchFnMock,
      });

      await expect(() => repository.getDocuments()).rejects.toThrowError(
        Error('Server has sent invalid data')
      );
    });
  });
});
