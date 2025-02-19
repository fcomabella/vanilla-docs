import { render } from '@__tests__/render';
import { Router } from '@config/router/models/router';
import { root } from '../root';
import { screen } from '@testing-library/dom';

describe('Root page', () => {
  const navigateMock = vi.fn();
  const routerMock: Router = {
    navigate: navigateMock,
  };

  beforeEach(() => {
    navigateMock.mockClear();
  });

  it('Should render', async () => {
    const searchParams = new URLSearchParams();

    render(
      root({
        searchParams,
        router: routerMock,
      })
    );

    const mainElem = screen.getByRole('main');

    expect(mainElem).toBeInTheDocument();
  });
});
