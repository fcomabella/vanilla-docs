import { Template } from '@config/router/models/template';
import { Button } from '@ui/shared/components/button';
import { Form } from '@ui/shared/components/form';
import { Header } from '@ui/shared/components/header';
import { InputField } from '@ui/shared/components/input-field/input-field';
import { Label } from '@ui/shared/components/label';
import { Main } from '@ui/shared/components/main/main';
import styles from './new-document.module.scss';
import { AttachmentsField } from '@ui/documents/components/attachments-field';
import { ContributorsField } from '@ui/documents/components/contributors-field/contributors-field';

export const newDocument: Template = () => {
  const main = Main({
    children: [
      Header({ children: 'New document' }),
      Form({
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
          AttachmentsField({}),
          ContributorsField({}),
          Button({
            children: 'Create document',
            type: 'submit',
          }),
        ],
        onSubmit: function (event) {
          event.preventDefault();
          const formData = new FormData(this);

          const attachments = formData.getAll('attachment');

          console.log(attachments);
        },
        className: styles.form,
      }),
    ],
  });

  return main;
};
