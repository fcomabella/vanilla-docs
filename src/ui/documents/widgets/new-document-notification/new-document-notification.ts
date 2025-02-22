import { container } from '@config/container';
import { Div } from '@ui/shared/components/div';
import { ElementConstructor } from '@ui/shared/models';
import styles from './new-document-notification.module.scss';
import { Icon } from '@ui/shared/components/icon/icon';
import { populateChildren } from '@ui/shared/components/utils';

export const NewDocumentNotification: ElementConstructor<
  Record<string, never>,
  HTMLDivElement
> = () => {
  const controller = container.resolve('newDocumentNotificationController');
  let notificationsCount = 0;

  const listener = (): void => {
    if (notificationContainer === null) {
      notificationContainer = Div({
        children: [
          countContainer,
          Div({ children: 'New documents', className: styles.label }),
        ],
        className: styles.root,
      });
      populateChildren(rootElem, notificationContainer);
    }

    notificationsCount = notificationsCount + 1;
    countElem.textContent =
      notificationsCount < 99 ? notificationsCount.toString() : '+99';
  };

  const unsubscribe = controller(listener);

  const observer = new MutationObserver(function () {
    if (!document.body.contains(rootElem)) {
      unsubscribe();
      observer.disconnect();
    }
  });

  observer.observe(document.body, { subtree: true, childList: true });

  const countElem = Div({
    children: null,
    className: styles.count,
  });

  const countContainer = Div({
    children: [
      Icon({ iconName: 'notifications', className: styles.icon }),
      countElem,
    ],
    className: styles.countContainer,
  });

  let notificationContainer: HTMLDivElement | null = null;

  const rootElem = Div({
    children: null,
  });

  return rootElem;
};
