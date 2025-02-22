import { NewDocumentSubject } from '@core/documents/application/use-cases';
import { NewDocumentMessage } from '@core/documents/domain/models';
import { NewDocumentMessage as NewDocumentMessageViewModel } from '@ui/documents/models';

export const NewDocumentNotificationController = ({
  newDocumentSubject,
}: {
  newDocumentSubject: ReturnType<typeof NewDocumentSubject>;
}): ((
  listener: (message: NewDocumentMessageViewModel) => void
) => () => void) => {
  return (listener) => {
    const newDocumentMessageListener = (message: NewDocumentMessage): void => {
      const viewMessage: NewDocumentMessageViewModel = {
        documentId: message.DocumentID,
        documentTitle: message.DocumentTitle,
        userId: message.UserID,
        userName: message.UserName,
      };
      listener(viewMessage);
    };

    return newDocumentSubject(newDocumentMessageListener);
  };
};
