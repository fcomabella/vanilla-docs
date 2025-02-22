import { Listener } from './listener';
import { Unsubscriber } from './unsubscriber';

export type Subscriber = (callback: Listener) => Unsubscriber;
