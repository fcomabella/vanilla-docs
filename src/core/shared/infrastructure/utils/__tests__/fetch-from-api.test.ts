import { server } from '@__tests__/server';
import { Document } from '@core/documents/domain/models';
import { DocumentsMother } from '@core/documents/domain/models/__mocks__/documents-mother';
import { DOCUMENTS_BASE_URL } from '@core/documents/infrastructure/constants';
import { HttpError } from '@core/shared/infrastructure/exceptions';
import { fetchFromApi } from '@core/shared/infrastructure/utils/fetch-from-api';
import { http, HttpResponse } from 'msw';

describe('fetchFromApi helper', () => {
  it('Should be a function', () => {
    expect(fetchFromApi).toBeInstanceOf(Function);
  });

  it('Should return the received json', async () => {
    const documents = DocumentsMother();
    const mappedDocuments = documents.map((document) => ({
      ...document,
      CreatedAt: document.CreatedAt.toISOString(),
      UpdatedAt: document.UpdatedAt.toISOString(),
    }));
    server.use(
      http.get(DOCUMENTS_BASE_URL, () =>
        HttpResponse.json<Array<Document>>(documents)
      )
    );

    const result = await fetchFromApi(DOCUMENTS_BASE_URL);

    expect(result).toStrictEqual(mappedDocuments);
  });

  it('Should throw for an invalid response code', async () => {
    server.use(
      http.get(
        DOCUMENTS_BASE_URL,
        () => new HttpResponse(null, { status: 409 })
      )
    );

    await expect(fetchFromApi(DOCUMENTS_BASE_URL)).rejects.toThrow(
      new HttpError(409, 'Conflict')
    );
  });
});
