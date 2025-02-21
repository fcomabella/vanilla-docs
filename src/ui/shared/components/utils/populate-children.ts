import { Child, Children } from '@ui/shared/models';

export const populateChildren = (
  parent: HTMLElement,
  children: Children
): void => {
  if (children === null) {
    return;
  }

  if (Array.isArray(children)) {
    parent.replaceChildren(
      ...children.filter(
        (child): child is Exclude<Child, null> => child !== null
      )
    );
    return;
  }

  parent.replaceChildren(children);
};
