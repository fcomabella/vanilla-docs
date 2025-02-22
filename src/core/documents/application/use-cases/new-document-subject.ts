import { NewDocumentMessage } from '@core/documents/domain/models/new-document-message';
import { isNewDocumentMessage } from '@core/documents/infrastructure/type-guards/is-new-document-message';
import { WebsocketSubject } from '@core/shared/infrastructure/models';

export const NewDocumentSubject = ({
  websocketSubject,
}: {
  websocketSubject: WebsocketSubject;
}) => {
  return (
    listener: (newDocumentMessage: NewDocumentMessage) => void
  ): (() => void) => {
    const websocketMessageListener = (dto: unknown): void => {
      if (isNewDocumentMessage(dto)) {
        listener(dto);
      }
    };

    return websocketSubject.addListener(websocketMessageListener);
  };
};
