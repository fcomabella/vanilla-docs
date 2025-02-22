import { Button } from '@ui/shared/components/button';
import { Div } from '@ui/shared/components/div';
import { IconButton } from '@ui/shared/components/icon-button/icon-button';
import { InputField } from '@ui/shared/components/input-field/input-field';
import { Label } from '@ui/shared/components/label';
import { populateChildren } from '@ui/shared/components/utils';
import { ElementConstructor } from '@ui/shared/models';
import { AttachmentsFieldProps } from './attachments-field-props';
import styles from './attachments-field.module.scss';

export const AttachmentsField: ElementConstructor<
  AttachmentsFieldProps,
  HTMLDivElement
> = ({ onAddEnd, onAddStart }) => {
  const refreshAttachments = (): void => {
    populateChildren(rootElem, [titleElem, ...attachments, addAtachmentButton]);
  };

  let attachments: Array<HTMLDivElement> = [];

  const attachmentField = InputField({
    name: 'new-attachment-name',
  });

  const attachmentFieldLabel = Label({
    children: attachmentField,
    label: 'Attachment name:',
    className: styles.label,
  });

  const errorMessage = Div({ children: null, className: styles.error });

  const saveAttachmentButton = Button({
    children: 'Save',
    onClick: function () {
      try {
        rootElem.removeChild(errorMessage);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {}

      const formValues = new FormData(this.form ?? undefined);
      const attachmentName = formValues.get('new-attachment-name');

      if (!attachmentName || typeof attachmentName !== 'string') {
        rootElem.appendChild(errorMessage);
        errorMessage.textContent = 'You must write the attachment name';
        return;
      }

      const attachmentIndex = attachments.length;
      const inputId = `attachment-${attachmentIndex}`;

      const attachmentInput = InputField({
        id: inputId,
        name: 'attachment',
        type: 'hidden',
        value: attachmentName,
      });

      const deleteAttachmentButton = IconButton({
        iconName: 'delete',
        label: 'Delete attachment',
        onClick: () => {
          attachments = attachments.filter((attachment) => {
            const hiddenInput = attachment.querySelector(`input#${inputId}`);
            return !hiddenInput;
          });
          refreshAttachments();
        },
      });

      const attachmentContainer = Div({
        children: [
          attachmentName?.toString() ?? null,
          deleteAttachmentButton,
          attachmentInput,
        ],
        className: styles.attachmentContainer,
      });

      attachments.push(attachmentContainer);
      attachmentField.value = '';

      refreshAttachments();
      onAddEnd?.();
    },
  });

  const cancelAttachmentButton = Button({
    children: 'Cancel',
    onClick: () => {
      attachmentField.value = '';
      refreshAttachments();
      onAddEnd?.();
    },
  });

  const addAttachmentElem = Div({
    children: [
      attachmentFieldLabel,
      saveAttachmentButton,
      cancelAttachmentButton,
    ],
    className: styles.addAttachment,
  });

  const titleElem = Div({ children: 'Attachments' });

  const addAtachmentButton = Button({
    children: 'Add attachment',
    onClick: () => {
      rootElem.replaceChild(addAttachmentElem, addAtachmentButton);
      onAddStart?.();
    },
  });

  const rootElem = Div({
    children: [titleElem, addAtachmentButton],
  });

  return rootElem;
};
