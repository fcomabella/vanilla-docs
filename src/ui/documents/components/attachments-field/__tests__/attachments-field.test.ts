import { renderInForm } from '@__tests__/render-in-form';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { AttachmentsField } from '@ui/documents/components/attachments-field/attachments-field';
import { ATTACHMENT_NAME_MIN_LENGTH } from '@ui/documents/constants';

describe('AttachmentsField component', () => {
  it('Should render', () => {
    renderInForm(AttachmentsField({}));

    expect(screen.getByText('Attachments')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add attachment' })
    ).toBeInTheDocument();
  });

  it('Should display the add attachment user interface', async () => {
    const user = userEvent.setup();

    renderInForm(AttachmentsField({}));

    const addAttachmentButton = screen.getByRole('button', {
      name: 'Add attachment',
    });

    await user.click(addAttachmentButton);

    expect(screen.getByText('Attachment name:')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Attachment name:' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('Should call the onAddStart callback', async () => {
    const user = userEvent.setup();
    const onAddStartMock = vi.fn();

    renderInForm(AttachmentsField({ onAddStart: onAddStartMock }));

    const addAttachmentButton = screen.getByRole('button', {
      name: 'Add attachment',
    });

    await user.click(addAttachmentButton);

    expect(onAddStartMock).toHaveBeenCalledOnce();
  });

  it('Should hide the add attachment interface on cancel', async () => {
    const user = userEvent.setup();

    renderInForm(AttachmentsField({}));

    const addAttachmentButton = screen.getByRole('button', {
      name: 'Add attachment',
    });

    await user.click(addAttachmentButton);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    await user.click(cancelButton);

    expect(screen.queryByText('Attachment name:')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('textbox', { name: 'Attachment name:' })
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

    renderInForm(AttachmentsField({ onAddEnd: onAddEndMock }));

    const addAttachmentButton = screen.getByRole('button', {
      name: 'Add attachment',
    });

    await user.click(addAttachmentButton);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    await user.click(cancelButton);

    expect(onAddEndMock).toHaveBeenCalledOnce();
  });

  it('Should show the attachment name required message', async () => {
    const user = userEvent.setup();

    renderInForm(AttachmentsField({}));

    const addAttachmentButton = screen.getByRole('button', {
      name: 'Add attachment',
    });
    await user.click(addAttachmentButton);

    const saveButton = screen.getByRole('button', { name: 'Save' });

    await user.click(saveButton);

    expect(
      screen.getByText('You must write the attachment name')
    ).toBeInTheDocument();
  });

  it('Should show the attachment min length message', async () => {
    const attachmentName = '12';
    const user = userEvent.setup();

    renderInForm(AttachmentsField({}));

    const addAttachmentButton = screen.getByRole('button', {
      name: 'Add attachment',
    });
    await user.click(addAttachmentButton);

    const attachmentNameInput = screen.getByRole('textbox', {
      name: 'Attachment name:',
    });

    await user.type(attachmentNameInput, attachmentName);

    const saveButton = screen.getByRole('button', { name: 'Save' });

    await user.click(saveButton);

    expect(
      screen.getByText(
        `The attachment name must have ${ATTACHMENT_NAME_MIN_LENGTH} or more letters.`
      )
    ).toBeInTheDocument();
  });

  it('Should not call the onAddEnd callback when attachment name is empty', async () => {
    const user = userEvent.setup();
    const onAddEndMock = vi.fn();
    renderInForm(AttachmentsField({ onAddEnd: onAddEndMock }));

    const addAttachmentButton = screen.getByRole('button', {
      name: 'Add attachment',
    });
    await user.click(addAttachmentButton);

    const saveButton = screen.getByRole('button', { name: 'Save' });

    await user.click(saveButton);

    expect(onAddEndMock).not.toHaveBeenCalled();
  });

  it('Should add the new attachment to the list', async () => {
    const user = userEvent.setup();
    const attachmentName = 'Test attachment';

    renderInForm(AttachmentsField({}));

    const addAttachmentButton = screen.getByRole('button', {
      name: 'Add attachment',
    });
    await user.click(addAttachmentButton);

    const attachmentNameInput = screen.getByRole('textbox', {
      name: 'Attachment name:',
    });

    await user.type(attachmentNameInput, attachmentName);

    expect(attachmentNameInput).toHaveValue(attachmentName);

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    expect(screen.getByText(attachmentName)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Delete attachment' })
    ).toBeInTheDocument();
  });

  it('Should call the onAddEnd callback when sucessfully adding', async () => {
    const user = userEvent.setup();
    const onAddEndMock = vi.fn();
    const attachmentName = 'Test attachment';

    renderInForm(AttachmentsField({ onAddEnd: onAddEndMock }));

    const addAttachmentButton = screen.getByRole('button', {
      name: 'Add attachment',
    });
    await user.click(addAttachmentButton);

    const attachmentNameInput = screen.getByRole('textbox', {
      name: 'Attachment name:',
    });

    await user.type(attachmentNameInput, attachmentName);

    expect(attachmentNameInput).toHaveValue(attachmentName);

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    expect(onAddEndMock).toHaveBeenCalledOnce();
  });

  it('Should delete the added attachment', async () => {
    const user = userEvent.setup();
    const attachmentName = 'Test attachment';

    renderInForm(AttachmentsField({}));

    const addAttachmentButton = screen.getByRole('button', {
      name: 'Add attachment',
    });
    await user.click(addAttachmentButton);

    const attachmentNameInput = screen.getByRole('textbox', {
      name: 'Attachment name:',
    });

    await user.type(attachmentNameInput, attachmentName);

    expect(attachmentNameInput).toHaveValue(attachmentName);

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    const deleteButton = screen.getByRole('button', {
      name: 'Delete attachment',
    });
    await user.click(deleteButton);

    expect(screen.queryByText(attachmentName)).not.toBeInTheDocument();
  });
});
