import { render } from '@__tests__/render';
import { root } from '../root';
import { screen } from '@testing-library/dom';
import { navigateMock, routerMock } from '@config/router/__mocks__/router-mock';

describe('Root page', () => {
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
    const button = screen.getByRole('button', { name: 'New document' });

    expect(mainElem).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
