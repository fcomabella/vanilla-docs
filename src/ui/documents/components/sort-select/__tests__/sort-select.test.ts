import { render } from '@__tests__/render';
import { navigateMock, routerMock } from '@config/router/__mocks__/router-mock';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { SortSelect } from '@ui/documents/components/sort-select/sort-select';
import { DocumentSort } from '@ui/documents/models';

describe('SortSelect component', () => {
  const searchParams = new URLSearchParams();

  beforeEach(() => {
    searchParams.set('sortBy', 'name');
  });

  it('Should render', () => {
    render(
      SortSelect({
        router: routerMock,
        searchParams,
        sort: 'name',
      })
    );

    expect(screen.getByRole('button')).toHaveTextContent('Select one...');
    expect(screen.getByText('arrow_drop_down')).toBeInTheDocument();
  });

  it('Should show the dropdown', async () => {
    const user = userEvent.setup();

    render(
      SortSelect({
        router: routerMock,
        searchParams,
        sort: 'name',
      })
    );

    const button = screen.getByRole('button');

    await user.click(button);

    expect(screen.getByRole('button', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Version' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Creation date' })
    ).toBeInTheDocument();
  });

  it('Should hide the dropdown', async () => {
    const user = userEvent.setup();

    render(
      SortSelect({
        router: routerMock,
        searchParams,
        sort: 'name',
      })
    );

    const button = screen.getByRole('button');

    await user.click(button);

    expect(screen.getByRole('button', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Version' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Creation date' })
    ).toBeInTheDocument();

    await user.click(button);

    expect(
      screen.queryByRole('button', { name: 'Name' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Version' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Creation date' })
    ).not.toBeInTheDocument();
  });

  it('Should hide the dropdown when clicking outside it', async () => {
    const user = userEvent.setup();

    const { baseElement } = render(
      SortSelect({
        router: routerMock,
        searchParams,
        sort: 'name',
      })
    );

    const button = screen.getByRole('button');

    await user.click(button);

    expect(screen.getByRole('button', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Version' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Creation date' })
    ).toBeInTheDocument();

    await user.click(baseElement);

    expect(
      screen.queryByRole('button', { name: 'Name' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Version' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Creation date' })
    ).not.toBeInTheDocument();
  });

  const sorts: Array<DocumentSort> = ['created', 'name', 'version'];
  const sortButtonNames: Record<DocumentSort, string> = {
    created: 'Creation date',
    name: 'Name',
    version: 'Version',
  };

  sorts.forEach((originSort) => {
    sorts.forEach((destinationSort) => {
      if (originSort === destinationSort) {
        it(`Should not navigate from ${originSort} to ${destinationSort}`, async () => {
          const user = userEvent.setup();

          render(
            SortSelect({
              router: routerMock,
              searchParams,
              sort: originSort,
            })
          );

          const button = screen.getByRole('button');

          await user.click(button);

          const destinationButton = screen.getByRole('button', {
            name: sortButtonNames[destinationSort],
          });

          await user.click(destinationButton);

          expect(navigateMock).not.toHaveBeenCalled();
          expect(
            screen.queryByRole('button', { name: 'Name' })
          ).not.toBeInTheDocument();
          expect(
            screen.queryByRole('button', { name: 'Version' })
          ).not.toBeInTheDocument();
          expect(
            screen.queryByRole('button', { name: 'Creation date' })
          ).not.toBeInTheDocument();
        });
      } else {
        it(`Should navigate from ${originSort} to ${destinationSort}`, async () => {
          const user = userEvent.setup();

          render(
            SortSelect({
              router: routerMock,
              searchParams,
              sort: originSort,
            })
          );

          const button = screen.getByRole('button');

          await user.click(button);

          const destinationButton = screen.getByRole('button', {
            name: sortButtonNames[destinationSort],
          });

          await user.click(destinationButton);

          expect(navigateMock).toHaveBeenCalled();
          expect(
            screen.queryByRole('button', { name: 'Name' })
          ).not.toBeInTheDocument();
          expect(
            screen.queryByRole('button', { name: 'Version' })
          ).not.toBeInTheDocument();
          expect(
            screen.queryByRole('button', { name: 'Creation date' })
          ).not.toBeInTheDocument();
        });
      }
    });
  });
});
