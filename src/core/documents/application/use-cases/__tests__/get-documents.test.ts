import { GetDocuments } from '@core/documents/application/use-cases/get-documents';
import {
  sortDocumentByCreatedAt,
  sortDocumentsByTitle,
  sortDocumentsByVersion,
} from '@core/documents/application/utils';
import { DocumentsMother } from '@core/documents/domain/models/__mocks__/documents-mother';
import { getDocumentsMock } from '@core/documents/domain/ports/__mocks__/documents-repositor-mock';

describe('GetDocuments use case', () => {
  it('Sould be a function', () => {
    expect(GetDocuments).toBeInstanceOf(Function);
  });

  it('Should return a function', () => {
    const getDocuments = GetDocuments({
      documentsRepository: { getDocuments: getDocumentsMock },
    });

    expect(getDocuments).toBeInstanceOf(Function);
  });

  it('Should return the documents list ordered by title', async () => {
    const documents = DocumentsMother();

    const expected = documents.toSorted(sortDocumentsByTitle);

    getDocumentsMock.mockResolvedValueOnce(documents);

    const getDocuments = GetDocuments({
      documentsRepository: { getDocuments: getDocumentsMock },
    });

    expect(await getDocuments('name')).toStrictEqual(expected);
  });

  it('Should return the documents list ordered by creation date', async () => {
    const documents = DocumentsMother();

    const expected = documents.toSorted(sortDocumentByCreatedAt);

    getDocumentsMock.mockResolvedValueOnce(documents);

    const getDocuments = GetDocuments({
      documentsRepository: { getDocuments: getDocumentsMock },
    });

    expect(await getDocuments('created')).toStrictEqual(expected);
  });

  it('Should return the documents list ordered by version', async () => {
    const documents = DocumentsMother();

    const expected = documents.toSorted(sortDocumentsByVersion);

    getDocumentsMock.mockResolvedValueOnce(documents);

    const getDocuments = GetDocuments({
      documentsRepository: { getDocuments: getDocumentsMock },
    });

    expect(await getDocuments('version')).toStrictEqual(expected);
  });
});
