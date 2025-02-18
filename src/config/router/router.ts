import { routes } from './routes';

export const outlet = document.createElement('div');

export const router = (path: string | URL | null): void => {
  window.history.pushState({}, '', path);

  routes.forEach((route) => {
    if (route.path === path) {
      outlet.innerHTML = route.template;
    }
  });
};
