import { DocumentSort } from '@ui/documents/models';
import { Button } from '@ui/shared/components/button';
import { Div } from '@ui/shared/components/div';
import { Icon } from '@ui/shared/components/icon/icon';
import { ElementConstructor } from '@ui/shared/models';
import { SortSelectProps } from './sort-select-props';
import styles from './sort-select.module.scss';

export const SortSelect: ElementConstructor<
  SortSelectProps,
  HTMLButtonElement
> = ({ router, searchParams, sort: currentSort }) => {
  let open: boolean = false;

  const documentOnClick = (event: MouseEvent): void => {
    let target: HTMLElement | null = event.target as HTMLElement;

    while (target !== null) {
      if (target === dropdown || target === rootElem) {
        break;
      }

      target = target.parentElement;
    }

    if (target === null) {
      setDropdownClosed();
    }
  };

  const setDropdownOpen = (): void => {
    const { x, height, y } = rootElem.getBoundingClientRect();
    dropdown.setAttribute('style', `top: ${y + height}px;left: ${x}px`);
    document.body.addEventListener('mousedown', documentOnClick);
    document.body.appendChild(dropdown);
    open = true;
  };

  const setDropdownClosed = (): void => {
    document.body.removeEventListener('mousedown', documentOnClick);
    try {
      document.body.removeChild(dropdown);
      // This block is added because the test runner throws when removing a
      // children
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {}
    open = false;
  };

  const getOnClick = (clickedSort: DocumentSort) => (): void => {
    setDropdownClosed();
    if (currentSort !== clickedSort) {
      searchParams.set('sortBy', clickedSort);
      router.navigate('/', searchParams);
    }
  };

  const dropdown = Div({
    children: [
      Button({ children: 'Name', onClick: getOnClick('name') }),
      Button({ children: 'Version', onClick: getOnClick('version') }),
      Button({ children: 'Creation date', onClick: getOnClick('created') }),
    ],
    className: styles.dropDown,
  });

  const rootElem = Button({
    children: [
      Div({ children: 'Select one...', className: styles.label }),
      Icon({ iconName: 'arrow_drop_down', className: styles.icon }),
    ],
    className: styles.root,
    onClick: () => {
      if (!open) {
        setDropdownOpen();
      } else {
        setDropdownClosed();
      }
    },
  });

  return rootElem;
};
