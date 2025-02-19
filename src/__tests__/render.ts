export interface RenderResult {
  container: HTMLElement;
  baseElement: HTMLElement;
}

export const render = (element: HTMLElement): RenderResult => {
  const baseElement = document.body;

  baseElement.replaceChildren(element);

  return {
    container: element,
    baseElement,
  };
};
