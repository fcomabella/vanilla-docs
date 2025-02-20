import { createRouter, outlet } from '@config/router/router';
import { waitFor } from '@testing-library/dom';
import { Div } from '@ui/shared/components/div';

describe('Router', () => {
  it('Should export an outlet div', () => {
    expect(outlet).toBeEmptyDOMElement();
  });

  it('Should export a createRouter function', () => {
    expect(createRouter).toBeInstanceOf(Function);
  });

  it('Should return a router', () => {
    const router = createRouter([]);
    expect(router).toHaveProperty('navigate');
    expect(router.navigate).toBeInstanceOf(Function);
  });

  it('Should show a not found', () => {
    const router = createRouter([]);

    router.navigate('/');

    expect(outlet).toHaveTextContent('Not found');
  });

  it('Should render the template with a string path', () => {
    const searchParams = new URLSearchParams();
    const div = Div({ children: 'Test template' });
    const Template = vi.fn().mockReturnValue(div);
    const router = createRouter([{ path: '/', template: Template }]);

    router.navigate('/', searchParams);

    expect(outlet).toContainElement(div);
    expect(Template).toHaveBeenCalledWith({
      router: { navigate: router.navigate },
      searchParams,
    });
  });

  it('Should render the template with a string url', () => {
    const searchParams = new URLSearchParams();
    const div = Div({ children: 'Test template' });
    const Template = vi.fn().mockReturnValue(div);
    const router = createRouter([{ path: '/', template: Template }]);

    router.navigate(window.location.href, searchParams);

    expect(outlet).toContainElement(div);
    expect(Template).toHaveBeenCalledWith({
      router: { navigate: router.navigate },
      searchParams,
    });
  });

  it('Should render the template with an URL object', () => {
    const url = new URL(window.location.href);
    const div = Div({ children: 'Test template' });
    const Template = vi.fn().mockReturnValue(div);
    const router = createRouter([{ path: '/', template: Template }]);

    router.navigate(url, url.searchParams);

    expect(outlet).toContainElement(div);
    expect(Template).toHaveBeenCalledWith({
      router: { navigate: router.navigate },
      searchParams: url.searchParams,
    });
  });

  it('Should render the route when history.back', async () => {
    const url = new URL(window.location.href);
    const div = Div({ children: 'Test template' });
    const Template = vi.fn().mockReturnValue(div);
    const router = createRouter([{ path: '/', template: Template }]);

    router.navigate(url, url.searchParams);

    expect(outlet).toContainElement(div);

    router.navigate('/test-path');

    expect(outlet).toHaveTextContent('Not found');

    window.history.back();

    await waitFor(() => expect(outlet).toContainElement(div));
  });
});
