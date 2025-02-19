import { Router } from './models/router';
import { Routes } from './models/routes';

export const outlet = document.createElement('div');

export const createRouter = (routes: Routes): Router => {
  let previousUrl: string | undefined = undefined;

  const mapPathToURL = (path: string | URL): URL => {
    if (typeof path === 'string') {
      if (!path.startsWith(window.location.origin)) {
        return new URL(window.location.origin + path);
      } else {
        return new URL(path);
      }
    }

    return path;
  };

  const navigate = (path: string | URL): void => {
    const url = mapPathToURL(path);

    window.history.pushState({}, '', url);

    routes.forEach((route) => {
      if (route.path === url.pathname) {
        outlet.replaceChildren(
          route.template({
            searchParams: url.searchParams,
            router: { navigate },
          })
        );
      }
    });

    previousUrl = window.location.href;
  };

  const observer = new MutationObserver(function (): void {
    if (window.location.href !== previousUrl) {
      navigate(new URL(window.location.href));
    }
  });

  observer.observe(document, { subtree: true, childList: true });

  return {
    navigate,
  };
};
