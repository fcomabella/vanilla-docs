import { router } from './config/router/router';

declare global {
  interface Window {
    router: typeof router;
  }
}
