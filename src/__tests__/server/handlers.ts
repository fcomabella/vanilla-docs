import { Document } from '@core/documents/domain/models';
import { DocumentsMother } from '@core/documents/domain/models/__mocks__/documents-mother';
import { DOCUMENTS_BASE_URL } from '@core/documents/infrastructure/constants';
import { http, HttpHandler, HttpResponse } from 'msw';

export const handlers: Array<HttpHandler> = [
  http.get(DOCUMENTS_BASE_URL, () => {
    return HttpResponse.json<Array<Document>>(DocumentsMother());
  }),
];
