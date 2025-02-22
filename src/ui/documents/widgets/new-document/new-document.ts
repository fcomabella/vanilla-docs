import { container } from '@config/container';
import { AttachmentsField } from '@ui/documents/components/attachments-field';
import { ContributorsField } from '@ui/documents/components/contributors-field/contributors-field';
import { newDocumentSchema } from '@ui/documents/schemas';
import { Button } from '@ui/shared/components/button';
import { Div } from '@ui/shared/components/div';
import { Form } from '@ui/shared/components/form';
import { InputField } from '@ui/shared/components/input-field';
import { Label } from '@ui/shared/components/label';
import { ElementConstructor } from '@ui/shared/models';
import { fromError } from 'zod-validation-error';
import { NewDocumentProps } from './new-document-props';
import styles from './new-document.module.scss';
import { isNewDocument } from '@ui/documents/type-guards';

export const NewDocument: ElementConstructor<
  NewDocumentProps,
  HTMLFormElement
> = ({ router }) => {
  const saveDocument = container.resolve('saveDocumentController');

  const errorContainer = Div({ children: '', className: styles.error });

  const submitButton = Button({
    children: 'Create document',
    type: 'submit',
  });

  const form = Form({
    id: 'new-document-form',
    children: [
      Label({
        children: InputField({
          name: 'title',
          fullWidth: true,
        }),
        label: 'Document name',
      }),
      Label({
        children: InputField({
          name: 'version',
          fullWidth: true,
        }),
        label: 'Version',
      }),
      AttachmentsField({
        onAddStart: () => {
          submitButton.disabled = true;
        },
        onAddEnd: () => {
          submitButton.disabled = false;
        },
      }),
      ContributorsField({
        onAddStart: () => {
          submitButton.disabled = true;
        },
        onAddEnd: () => {
          submitButton.disabled = false;
        },
      }),
      submitButton,
    ],
    onSubmit: function (event) {
      event.preventDefault();

      try {
        form.removeChild(errorContainer);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {}

      const formData = new FormData(this);
      const dataAsObject = Object.fromEntries(formData);
      const attachments = formData
        .getAll('attachment')
        .filter((entry): entry is string => typeof entry === 'string');
      const contributors = formData
        .getAll('contributor')
        .filter((entry): entry is string => typeof entry === 'string');

      const newDocument = {
        name: dataAsObject.title,
        version: dataAsObject.version,
        attachments,
        contributors,
      };

      if (!isNewDocument(newDocument)) {
        const { error } = newDocumentSchema.safeParse(newDocument);
        form.appendChild(errorContainer);
        errorContainer.textContent = fromError(error).message;
        return;
      }

      saveDocument(newDocument).then(() => {
        router.navigate('/');
      });
    },
    className: styles.form,
  });
  return form;
};
