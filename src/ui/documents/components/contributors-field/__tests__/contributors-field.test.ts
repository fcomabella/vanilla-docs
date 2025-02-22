import { renderInForm } from '@__tests__/render-in-form';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { ContributorsField } from '@ui/documents/components/contributors-field/contributors-field';
import { CONTRIBUTOR_NAME_MIN_LENGTH } from '@ui/documents/constants';

describe('ContributorsField component', () => {
  it('Should render', () => {
    renderInForm(ContributorsField({}));

    expect(screen.getByText('Contributors')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add contributor' })
    ).toBeInTheDocument();
  });

  it('Should display the add contributor interface', async () => {
    const user = userEvent.setup();

    renderInForm(ContributorsField({}));

    const addContributorButton = screen.getByRole('button', {
      name: 'Add contributor',
    });

    await user.click(addContributorButton);

    expect(screen.getByText('Contributor name:')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Contributor name:' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('Should call the onAddStart callback', async () => {
    const user = userEvent.setup();
    const onAddStartMock = vi.fn();

    renderInForm(ContributorsField({ onAddStart: onAddStartMock }));

    const addContributorButton = screen.getByRole('button', {
      name: 'Add contributor',
    });

    await user.click(addContributorButton);

    expect(onAddStartMock).toHaveBeenCalledOnce();
  });

  it('Should hide the add contributor interface on cancel', async () => {
    const user = userEvent.setup();

    renderInForm(ContributorsField({}));

    const addContributorButton = screen.getByRole('button', {
      name: 'Add contributor',
    });

    await user.click(addContributorButton);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    await user.click(cancelButton);

    expect(screen.queryByText('Contributor name:')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('textbox', { name: 'Contributor name:' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Save' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Cancel' })
    ).not.toBeInTheDocument();
  });

  it('Should call the onAddEnd callback on cancel', async () => {
    const user = userEvent.setup();
    const onAddEndMock = vi.fn();

    renderInForm(ContributorsField({ onAddEnd: onAddEndMock }));

    const addContributorButton = screen.getByRole('button', {
      name: 'Add contributor',
    });

    await user.click(addContributorButton);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    await user.click(cancelButton);

    expect(onAddEndMock).toHaveBeenCalledOnce();
  });

  it('Should show the contributor name required message', async () => {
    const user = userEvent.setup();

    renderInForm(ContributorsField({}));

    const addContributorButton = screen.getByRole('button', {
      name: 'Add contributor',
    });
    await user.click(addContributorButton);

    const saveButton = screen.getByRole('button', { name: 'Save' });

    await user.click(saveButton);

    expect(
      screen.getByText('You must write the contributor name')
    ).toBeInTheDocument();
  });

  it('Should show the contributor name min length message', async () => {
    const contributorName = '12';
    const user = userEvent.setup();

    renderInForm(ContributorsField({}));

    const addContributorButton = screen.getByRole('button', {
      name: 'Add contributor',
    });
    await user.click(addContributorButton);

    const contributorNameInput = screen.getByRole('textbox', {
      name: 'Contributor name:',
    });

    await user.type(contributorNameInput, contributorName);

    const saveButton = screen.getByRole('button', { name: 'Save' });

    await user.click(saveButton);

    expect(
      screen.getByText(
        `The contributor name must have ${CONTRIBUTOR_NAME_MIN_LENGTH} or more letters.`
      )
    ).toBeInTheDocument();
  });

  it('Should not call the onAddEnd callback when contributor name is empty', async () => {
    const user = userEvent.setup();
    const onAddEndMock = vi.fn();
    renderInForm(ContributorsField({ onAddEnd: onAddEndMock }));

    const addContributorButton = screen.getByRole('button', {
      name: 'Add contributor',
    });
    await user.click(addContributorButton);

    const saveButton = screen.getByRole('button', { name: 'Save' });

    await user.click(saveButton);

    expect(onAddEndMock).not.toHaveBeenCalled();
  });

  it('Should add the new contributor to the list', async () => {
    const user = userEvent.setup();
    const contributorName = 'Test contributor';

    renderInForm(ContributorsField({}));

    const addContributorButton = screen.getByRole('button', {
      name: 'Add contributor',
    });
    await user.click(addContributorButton);

    const contributorNameInput = screen.getByRole('textbox', {
      name: 'Contributor name:',
    });

    await user.type(contributorNameInput, contributorName);

    expect(contributorNameInput).toHaveValue(contributorName);

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    expect(screen.getByText(contributorName)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Delete contributor' })
    ).toBeInTheDocument();
  });

  it('Should call the onAddEnd callback when sucessfully adding', async () => {
    const user = userEvent.setup();
    const onAddEndMock = vi.fn();
    const contributorName = 'Test contributor';

    renderInForm(ContributorsField({ onAddEnd: onAddEndMock }));

    const addContributorButton = screen.getByRole('button', {
      name: 'Add contributor',
    });
    await user.click(addContributorButton);

    const contributorNameInput = screen.getByRole('textbox', {
      name: 'Contributor name:',
    });

    await user.type(contributorNameInput, contributorName);

    expect(contributorNameInput).toHaveValue(contributorName);

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    expect(onAddEndMock).toHaveBeenCalledOnce();
  });

  it('Should delete the added contributor', async () => {
    const user = userEvent.setup();
    const contributorName = 'Test contributor';

    renderInForm(ContributorsField({}));

    const addContributorButton = screen.getByRole('button', {
      name: 'Add contributor',
    });
    await user.click(addContributorButton);

    const contributorNameInput = screen.getByRole('textbox', {
      name: 'Contributor name:',
    });

    await user.type(contributorNameInput, contributorName);

    expect(contributorNameInput).toHaveValue(contributorName);

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    const deleteButton = screen.getByRole('button', {
      name: 'Delete contributor',
    });
    await user.click(deleteButton);

    expect(screen.queryByText(contributorName)).not.toBeInTheDocument();
  });
});
