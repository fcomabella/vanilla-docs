import { Router } from './models/router';
import { Routes } from './models/routes';

export const outlet = document.createElement('div');

export const createRouter = (routes: Routes): Router => {
  let previousUrl: string | undefined = undefined;

  const mapPathToURL = (
    path: string | URL,
    searchParams?: URLSearchParams
  ): URL => {
    if (typeof path === 'string') {
      if (!path.startsWith(window.location.origin)) {
        const url = new URL(window.location.origin + path);

        if (searchParams) {
          url.search = searchParams.toString();
        }

        return url;
      } else {
        const url = new URL(path);

        if (searchParams) {
          url.search = searchParams.toString();
        }

        return url;
      }
    }

    return path;
  };

  const renderRoute = (url: URL): void => {
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
    previousUrl = url.href;
  };

  const navigate = (
    path: string | URL,
    searchParams?: URLSearchParams
  ): void => {
    const url = mapPathToURL(path, searchParams);

    window.history.pushState({}, '', url);

    renderRoute(url);
  };

  window.addEventListener('popstate', function () {
    const url = new URL(this.location.href);
    renderRoute(url);
  });

  const observer = new MutationObserver(function (): void {
    if (window.location.href !== previousUrl) {
      const url = new URL(window.location.href);
      renderRoute(url);
    }
  });

  observer.observe(document, { subtree: true, childList: true });

  return {
    navigate,
  };
};
