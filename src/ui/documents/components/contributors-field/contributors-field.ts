import { Button } from '@ui/shared/components/button';
import { Div } from '@ui/shared/components/div';
import { IconButton } from '@ui/shared/components/icon-button/icon-button';
import { InputField } from '@ui/shared/components/input-field/input-field';
import { Label } from '@ui/shared/components/label';
import { populateChildren } from '@ui/shared/components/utils';
import { ElementConstructor } from '@ui/shared/models';
import { ContributorsFieldProps } from './contributors-field-props';
import styles from './contributors-field.module.scss';
import { CONTRIBUTOR_NAME_MIN_LENGTH } from '@ui/documents/constants';

export const ContributorsField: ElementConstructor<
  ContributorsFieldProps,
  HTMLDivElement
> = ({ onAddEnd, onAddStart }) => {
  const refreshContributors = (): void => {
    populateChildren(rootElem, [
      titleElem,
      ...contributors,
      addContributorButton,
    ]);
  };

  let contributors: Array<HTMLDivElement> = [];

  const contributorField = InputField({
    name: 'new-contributor-name',
  });

  const contributorFieldLabel = Label({
    children: contributorField,
    label: 'Contributor name:',
    className: styles.label,
  });

  const errorMessage = Div({ children: null, className: styles.error });

  const saveContributtorButton = Button({
    children: 'Save',
    onClick: function () {
      try {
        rootElem.removeChild(errorMessage);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {}

      const formValues = new FormData(this.form ?? undefined);
      const contributorName = formValues.get('new-contributor-name');

      if (!contributorName || typeof contributorName !== 'string') {
        rootElem.appendChild(errorMessage);
        errorMessage.textContent = 'You must write the contributor name';
        return;
      }

      if (contributorName.length < CONTRIBUTOR_NAME_MIN_LENGTH) {
        rootElem.appendChild(errorMessage);
        errorMessage.textContent = `The contributor name must have ${CONTRIBUTOR_NAME_MIN_LENGTH} or more letters.`;
        return;
      }

      const contributorIndex = contributors.length;
      const inputId = `contributor-${contributorIndex}`;

      const contributorInput = InputField({
        id: inputId,
        name: 'contributor',
        type: 'hidden',
        value: (contributorName as string) ?? '',
      });

      const deleteContributorButton = IconButton({
        iconName: 'delete',
        label: 'Delete contributor',
        onClick: () => {
          contributors = contributors.filter((contributor) => {
            const hiddenInput = contributor.querySelector(`input#${inputId}`);
            return !hiddenInput;
          });
          refreshContributors();
        },
      });

      const contributorContainer = Div({
        children: [
          contributorName?.toString() ?? null,
          deleteContributorButton,
          contributorInput,
        ],
        className: styles.contributorContainer,
      });

      contributors.push(contributorContainer);
      contributorField.value = '';

      refreshContributors();
      onAddEnd?.();
    },
  });

  const cancelContributorButton = Button({
    children: 'Cancel',
    onClick: () => {
      contributorField.value = '';
      refreshContributors();
      onAddEnd?.();
    },
  });

  const addContributorElem = Div({
    children: [
      contributorFieldLabel,
      saveContributtorButton,
      cancelContributorButton,
    ],
    className: styles.addContributor,
  });

  const titleElem = Div({ children: 'Contributors' });

  const addContributorButton = Button({
    children: 'Add contributor',
    onClick: () => {
      rootElem.replaceChild(addContributorElem, addContributorButton);
      onAddStart?.();
    },
  });

  const rootElem = Div({ children: [titleElem, addContributorButton] });

  return rootElem;
};
