import { Document } from '@core/documents/domain/models';
import { DocumentsMother } from '@core/documents/domain/models/__mocks__/documents-mother';
import { DOCUMENTS_BASE_URL } from '@core/documents/infrastructure/constants';
import { NewDocumentMessageMother } from '@core/documents/infrastructure/models/__mocks__/new-document-message-mother';
import { WS_BASE_URL } from '@core/shared/infrastructure/constants';
import { http, HttpHandler, HttpResponse, WebSocketHandler, ws } from 'msw';

const notificator = ws.link(WS_BASE_URL);

export const handlers: Array<HttpHandler | WebSocketHandler> = [
  http.get(DOCUMENTS_BASE_URL, () => {
    return HttpResponse.json<Array<Document>>(DocumentsMother());
  }),
  notificator.addEventListener('connection', ({ client }) => {
    setInterval(() => {
      client.send(JSON.stringify(NewDocumentMessageMother()));
    }, 1000);
  }),
];
