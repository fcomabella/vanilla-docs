import { sortDocumentByCreatedAt } from '@core/documents/application/utils/sort-document-by-created-at';
import { DocumentMother } from '@core/documents/domain/models/__mocks__/document-mother';
import { faker } from '@faker-js/faker';

describe('sortDocumentsByCreatedAt helper', () => {
  it('Should return a negative value when b is posterior to a', () => {
    const a = DocumentMother();
    const b = DocumentMother();
    b.CreatedAt = faker.date.future({ refDate: a.CreatedAt });

    expect(sortDocumentByCreatedAt(a, b)).toBeLessThan(0);
  });

  it('Should return a positive value when b is anterior to a', () => {
    const a = DocumentMother();
    const b = DocumentMother();
    b.CreatedAt = faker.date.past({ refDate: a.CreatedAt });

    expect(sortDocumentByCreatedAt(a, b)).toBeGreaterThan(0);
  });

  it('Should return 0 when b is equal to a', () => {
    const a = DocumentMother();
    const b = DocumentMother();
    b.CreatedAt = a.CreatedAt;

    expect(sortDocumentByCreatedAt(a, b)).toEqual(0);
  });
});
