import { sortDocumentsByTitle } from '@core/documents/application/utils/sort-documents-by-title';
import { DocumentMother } from '@core/documents/domain/models/__mocks__/document-mother';

describe('SortDocumentsByTitle helper', () => {
  it('Should be a function', () => {
    expect(sortDocumentsByTitle).toBeInstanceOf(Function);
  });

  it('Should return -1 when Title from a comes before Title from b', () => {
    const a = DocumentMother();
    a.Title = 'a';

    const b = DocumentMother();
    b.Title = 'b';
    expect(sortDocumentsByTitle(a, b)).toEqual(-1);
  });

  it('Should return 1 when Title from a comes after Title from b', () => {
    const a = DocumentMother();
    a.Title = 'b';

    const b = DocumentMother();
    b.Title = 'a';
    expect(sortDocumentsByTitle(a, b)).toEqual(1);
  });

  it('Should return 0 when Titles are equal', () => {
    const a = DocumentMother();
    a.Title = 'a';

    const b = DocumentMother();
    b.Title = 'a';
    expect(sortDocumentsByTitle(a, b)).toEqual(0);
  });
});
