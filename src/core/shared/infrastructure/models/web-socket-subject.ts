import { Subscriber } from './subscriber';

export interface WebsocketSubject {
  addListener: Subscriber;
}
