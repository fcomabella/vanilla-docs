import { container } from '@config/container';
import { Div } from '@ui/shared/components/div';
import { ElementConstructor } from '@ui/shared/models';

export const NewDocumentNotification: ElementConstructor<
  Record<string, never>,
  HTMLDivElement
> = () => {
  const controller = container.resolve('newDocumentNotificationController');
  let notificationsCount = 0;

  const listener = (): void => {
    notificationsCount = notificationsCount + 1;
    countElem.textContent = notificationsCount.toString();
  };

  const unsubscribe = controller(listener);

  const observer = new MutationObserver(function () {
    if (!document.body.contains(rootElem)) {
      unsubscribe();
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  const countElem = Div({
    children: notificationsCount.toString(),
  });

  const rootElem = Div({
    children: [countElem, Div({ children: 'New documents' })],
  });

  return rootElem;
};
