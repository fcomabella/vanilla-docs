import { render } from '@__tests__/render';
import { navigateMock, routerMock } from '@config/router/__mocks__/router-mock';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { OptionsBar } from '@ui/documents/components/options-bar/options-bar';

describe('Options bar component', () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it('Should render', () => {
    render(
      OptionsBar({
        router: routerMock,
        searchParams: new URLSearchParams(),
        view: 'list',
        sort: 'name',
      })
    );

    expect(screen.getByText('Sort by:')).toBeInTheDocument();
    expect(screen.getByLabelText('View as list')).toBeInTheDocument();
    expect(screen.getByLabelText('View as grid')).toBeInTheDocument();
  });

  it('Should not navigate to the list view', async () => {
    const user = userEvent.setup();

    render(
      OptionsBar({
        router: routerMock,
        searchParams: new URLSearchParams(),
        view: 'list',
        sort: 'name',
      })
    );

    const button = screen.getByLabelText('View as list');

    await user.click(button);

    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('Should navigate to the list view', async () => {
    const user = userEvent.setup();

    render(
      OptionsBar({
        router: routerMock,
        searchParams: new URLSearchParams(),
        view: 'grid',
        sort: 'name',
      })
    );

    const button = screen.getByLabelText('View as list');

    await user.click(button);

    expect(navigateMock).toHaveBeenCalled();
  });

  it('Should not navigate to the grid view', async () => {
    const user = userEvent.setup();

    render(
      OptionsBar({
        router: routerMock,
        searchParams: new URLSearchParams(),
        view: 'grid',
        sort: 'name',
      })
    );

    const button = screen.getByLabelText('View as grid');

    await user.click(button);

    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('Should navigate to the grid view', async () => {
    const user = userEvent.setup();

    render(
      OptionsBar({
        router: routerMock,
        searchParams: new URLSearchParams(),
        view: 'list',
        sort: 'name',
      })
    );

    const button = screen.getByLabelText('View as grid');

    await user.click(button);

    expect(navigateMock).toHaveBeenCalled();
  });
});
