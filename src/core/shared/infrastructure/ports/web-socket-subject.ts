import { WS_BASE_URL } from '@core/shared/infrastructure/constants';
import { WebsocketFactory } from '@core/shared/infrastructure/models';

export const WebsocketSubject: WebsocketFactory = () => {
  let listeners: Array<(messsage: unknown) => void> = [];

  const messageListener = (event: MessageEvent<string>): void => {
    listeners.forEach((listener) => {
      try {
        listener(JSON.parse(event.data));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {}
    });
  };

  const addMessageEventListener = (): void => {
    if (!socket) {
      return;
    }
    socket.addEventListener('message', messageListener);
  };

  const removeMessageEventListener = (): void => {
    if (!socket) {
      return;
    }

    socket.removeEventListener('message', messageListener);
  };

  const socket = new WebSocket(WS_BASE_URL);

  socket.addEventListener('open', () => {
    addMessageEventListener();
  });

  socket.addEventListener('close', () => {
    removeMessageEventListener();
  });

  socket.addEventListener('error', () => {
    removeMessageEventListener();
  });

  return {
    addListener: (callback: (message: unknown) => void): (() => void) => {
      const found = listeners.find(callback);

      if (!found) {
        listeners.push(callback);
      }

      return () => {
        listeners = listeners.filter((registered) => registered !== callback);
      };
    },
  };
};
