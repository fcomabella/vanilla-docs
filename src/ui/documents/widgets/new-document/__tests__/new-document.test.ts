import { PromiseMother } from '@__mocks__/promise-mother';
import { render } from '@__tests__/render';
import { routerMock } from '@config/router/__mocks__/router-mock';
import { LOCAL_STORAGE_DOCUMENTS_KEY } from '@core/documents/infrastructure/constants/local-storage-documents-key';
import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { NewDocumentMother } from '@ui/documents/models/__mocks__/new-document-mother';
import { NewDocument } from '@ui/documents/widgets/new-document/new-document';

describe('NewDocument widget', () => {
  it('Should render the initial form', () => {
    render(NewDocument({ router: routerMock }));

    expect(
      screen.getByRole('textbox', { name: 'Document name' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Version' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add attachment' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add contributor' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Create document' })
    ).toBeInTheDocument();
  });

  it('Should disable the save button while adding an attachment', async () => {
    const user = userEvent.setup();

    render(NewDocument({ router: routerMock }));

    const createDocumentButton = screen.getByRole('button', {
      name: 'Create document',
    });

    expect(createDocumentButton).toBeEnabled();

    const addAtachmentButton = screen.getByRole('button', {
      name: 'Add attachment',
    });

    await user.click(addAtachmentButton);

    expect(createDocumentButton).toBeDisabled();

    const cancelAttachmentButton = screen.getByRole('button', {
      name: 'Cancel',
    });

    await user.click(cancelAttachmentButton);

    expect(createDocumentButton).toBeEnabled();
  });

  it('Should disable the save button while adding a contributor', async () => {
    const user = userEvent.setup();

    render(NewDocument({ router: routerMock }));

    const createDocumentButton = screen.getByRole('button', {
      name: 'Create document',
    });

    expect(createDocumentButton).toBeEnabled();

    const addContributorButton = screen.getByRole('button', {
      name: 'Add contributor',
    });

    await user.click(addContributorButton);

    expect(createDocumentButton).toBeDisabled();

    const cancelContributorButton = screen.getByRole('button', {
      name: 'Cancel',
    });

    await user.click(cancelContributorButton);

    expect(createDocumentButton).toBeEnabled();
  });

  it('Should show all the validation errors', async () => {
    const user = userEvent.setup();

    render(NewDocument({ router: routerMock }));

    const createDocumentButton = screen.getByRole('button', {
      name: 'Create document',
    });

    await user.click(createDocumentButton);

    expect(
      screen.getByText(/The name must have at least 3 letters at "name";/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The version must be on the form 0\.0\.0 at "version";/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /A document must have at least a contributor at "contributors"/i
      )
    ).toBeInTheDocument();
  });

  it('Should show only the document name validation error', async () => {
    const user = userEvent.setup();

    render(NewDocument({ router: routerMock }));

    const versionInput = screen.getByRole('textbox', { name: 'Version' });

    await user.type(versionInput, faker.system.semver());

    const addContributorButton = screen.getByRole('button', {
      name: 'Add contributor',
    });

    await user.click(addContributorButton);

    const contributorNameInput = screen.getByRole('textbox', {
      name: 'Contributor name:',
    });

    await user.type(contributorNameInput, faker.person.fullName());

    const saveContributorButton = screen.getByRole('button', { name: 'Save' });

    await user.click(saveContributorButton);

    const createDocumentButton = screen.getByRole('button', {
      name: 'Create document',
    });

    await user.click(createDocumentButton);

    expect(
      screen.getByText(/The name must have at least 3 letters at "name"/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        /The version must be on the form 0\.0\.0 at "version";/i
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        /A document must have at least a contributor at "contributors"/i
      )
    ).not.toBeInTheDocument();
  });

  it('Should show only the version validation error', async () => {
    const user = userEvent.setup();

    render(NewDocument({ router: routerMock }));

    const nameInput = screen.getByRole('textbox', { name: 'Document name' });

    await user.type(nameInput, faker.system.fileName());

    const addContributorButton = screen.getByRole('button', {
      name: 'Add contributor',
    });

    await user.click(addContributorButton);

    const contributorNameInput = screen.getByRole('textbox', {
      name: 'Contributor name:',
    });

    await user.type(contributorNameInput, faker.person.fullName());

    const saveContributorButton = screen.getByRole('button', { name: 'Save' });

    await user.click(saveContributorButton);

    const createDocumentButton = screen.getByRole('button', {
      name: 'Create document',
    });

    await user.click(createDocumentButton);

    expect(
      screen.queryByText(/The name must have at least 3 letters at "name"/i)
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/The version must be on the form 0\.0\.0 at "version"/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        /A document must have at least a contributor at "contributors"/i
      )
    ).not.toBeInTheDocument();
  });

  it('Should show only the contributor validation error', async () => {
    const user = userEvent.setup();

    render(NewDocument({ router: routerMock }));

    const nameInput = screen.getByRole('textbox', { name: 'Document name' });

    await user.type(nameInput, faker.system.fileName());

    const versionInput = screen.getByRole('textbox', { name: 'Version' });

    await user.type(versionInput, faker.system.semver());

    const createDocumentButton = screen.getByRole('button', {
      name: 'Create document',
    });

    await user.click(createDocumentButton);

    expect(
      screen.queryByText(/The name must have at least 3 letters at "name"/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        /The version must be on the form 0\.0\.0 at "version"/i
      )
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        /A document must have at least a contributor at "contributors"/i
      )
    ).toBeInTheDocument();
  });

  it('Should save a correct document', async () => {
    const user = userEvent.setup();
    const newDocument = NewDocumentMother();
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const { promise, resolve } = PromiseMother<void>();

    render(NewDocument({ router: routerMock }));

    const nameInput = screen.getByRole('textbox', { name: 'Document name' });

    await user.type(nameInput, newDocument.name);

    const versionInput = screen.getByRole('textbox', { name: 'Version' });

    await user.type(versionInput, newDocument.version);

    for (const attachment of newDocument.attachments) {
      const addAttachmentButton = screen.getByRole('button', {
        name: 'Add attachment',
      });

      await user.click(addAttachmentButton);

      const attachmentNameInput = screen.getByRole('textbox', {
        name: 'Attachment name:',
      });

      await user.type(attachmentNameInput, attachment);

      const saveAttachmentButton = screen.getByRole('button', { name: 'Save' });

      await user.click(saveAttachmentButton);
    }

    for (const contributor of newDocument.contributors) {
      const addContributorButton = screen.getByRole('button', {
        name: 'Add contributor',
      });

      await user.click(addContributorButton);

      const contributorNameInput = screen.getByRole('textbox', {
        name: 'Contributor name:',
      });

      await user.type(contributorNameInput, contributor);

      const saveContributorButton = screen.getByRole('button', {
        name: 'Save',
      });

      await user.click(saveContributorButton);
    }

    const createDocumentButton = screen.getByRole('button', {
      name: 'Create document',
    });

    await user.click(createDocumentButton);

    expect(setItemSpy).toHaveBeenCalled();

    const [key, value] = setItemSpy.mock.lastCall ?? ['', ''];
    const saved = JSON.parse(value);
    expect(key).toEqual(LOCAL_STORAGE_DOCUMENTS_KEY);
    expect(saved).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Attachments: newDocument.attachments,
          Contributors: expect.arrayContaining(
            newDocument.contributors.map((contributor) =>
              expect.objectContaining({
                Name: contributor,
              })
            )
          ),
          Title: newDocument.name,
          Version: newDocument.version,
        }),
      ])
    );

    resolve();

    await promise;

    expect(routerMock.navigate).toHaveBeenCalledWith('/');
  });
});
