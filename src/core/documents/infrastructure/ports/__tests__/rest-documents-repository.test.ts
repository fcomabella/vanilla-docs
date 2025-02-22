import { DocumentMother } from '@core/documents/domain/models/__mocks__/document-mother';
import { LOCAL_STORAGE_DOCUMENTS_KEY } from '@core/documents/infrastructure/constants/local-storage-documents-key';
import { DocumentResponseMother } from '@core/documents/infrastructure/models/__mocks__/document-response-mother';
import { DocumentsResponseMother } from '@core/documents/infrastructure/models/__mocks__/documents-response-mother';
import {
  documentResponseToDocument,
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
      const localStorageDocuments = DocumentsResponseMother();
      const localStorageSpy = vi.spyOn(Storage.prototype, 'getItem');
      localStorageSpy.mockReturnValueOnce(
        JSON.stringify(localStorageDocuments)
      );

      const expected = [
        ...documents.map((document) => documentResponseToDocument(document)),
        ...localStorageDocuments.map((document) =>
          documentResponseToDocument(document)
        ),
      ];

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

  describe('saveDocument method', () => {
    it('Should save the document to localStorage', async () => {
      const document = DocumentMother();
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

      const repository = RestDocumentsRepository({
        fetchFn: fetchFnMock,
      });

      await repository.saveDocument(document);

      const expected = JSON.stringify([document]);

      expect(setItemSpy).toHaveBeenCalledWith(
        LOCAL_STORAGE_DOCUMENTS_KEY,
        expected
      );
    });
  });
});
