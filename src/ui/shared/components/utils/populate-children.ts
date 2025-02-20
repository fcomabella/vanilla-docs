import { Children } from '@ui/shared/models';

export const populateChildren = (
  parent: HTMLElement,
  children: Children
): void => {
  if (typeof children === 'string') {
    parent.textContent = children;
  } else if (Array.isArray(children)) {
    children.forEach((element) => {
      parent.appendChild(element);
    });
  } else {
    parent.appendChild(children);
  }
};
