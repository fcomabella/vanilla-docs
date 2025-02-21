import { Children } from '@ui/shared/models';

export const populateChildren = (
  parent: HTMLElement,
  children: Children
): void => {
  if (children === null) {
    return;
  }

  if (typeof children === 'string') {
    parent.textContent = children;
    return;
  }

  if (Array.isArray(children)) {
    parent.replaceChildren(
      ...children.filter((child): child is HTMLElement => child !== null)
    );
    return;
  }

  parent.replaceChildren(children);
};
