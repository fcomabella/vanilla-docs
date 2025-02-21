import { populateChildren } from '@ui/shared/components/utils/populate-children';

describe('populateChildren helper', () => {
  it('Should be a function', () => {
    expect(populateChildren).toBeInstanceOf(Function);
  });

  it('Should do nothing for a null children', () => {
    const elem = document.createElement('div');

    populateChildren(elem, null);

    expect(elem).toBeEmptyDOMElement();
  });

  it('Should set the textContent when children is a string', () => {
    const elem = document.createElement('div');
    const text = 'Test text';

    populateChildren(elem, text);

    expect(elem).toHaveTextContent(text);
  });

  it('Should render a single element', () => {
    const elem = document.createElement('div');
    const root = document.createElement('div');

    populateChildren(root, elem);

    expect(root).toContainElement(elem);
  });

  it('Should render all the elements in the array', () => {
    const elems = Array(2).fill(document.createElement('div'));
    const root = document.createElement('div');

    populateChildren(root, elems);

    elems.forEach((elem) => expect(root).toContainElement(elem));
  });
});
