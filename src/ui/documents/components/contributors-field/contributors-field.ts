import { InputField } from '@ui/shared/components/input-field/input-field';
import { Label } from '@ui/shared/components/label';
import { ElementConstructor } from '@ui/shared/models';
import styles from './contributors-field.module.scss';
import { Button } from '@ui/shared/components/button';
import { IconButton } from '@ui/shared/components/icon-button/icon-button';
import { Div } from '@ui/shared/components/div';
import { populateChildren } from '@ui/shared/components/utils';

export const ContributorsField: ElementConstructor<
  Record<string, never>,
  HTMLDivElement
> = () => {
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

  const saveContributtorButton = Button({
    children: 'Save',
    onClick: function () {
      const formValues = new FormData(this.form ?? undefined);
      const contributorName = formValues.get('new-contributor-name');

      if (typeof contributorName !== 'string') {
        return;
      }

      if (!contributorName) {
        alert('You must write the contributor name');
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
    },
  });

  const cancelContributorButton = Button({
    children: 'Cancel',
    onClick: () => {
      contributorField.value = '';
      refreshContributors();
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
    },
  });

  const rootElem = Div({ children: [titleElem, addContributorButton] });

  return rootElem;
};
