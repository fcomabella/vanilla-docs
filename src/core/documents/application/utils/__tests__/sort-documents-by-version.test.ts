import { sortDocumentsByVersion } from '@core/documents/application/utils/sort-documents-by-version';
import { DocumentMother } from '@core/documents/domain/models/__mocks__/document-mother';
import { Version } from '@core/shared/domain/models';

describe('sortDocumentsByVersion helper', () => {
  it('Should be a function', () => {
    expect(sortDocumentsByVersion).toBeInstanceOf(Function);
  });

  it('Should return the difference between major versions', () => {
    const a = DocumentMother();
    a.Version = '1.0.0';

    const b = DocumentMother();
    b.Version = '3.0.0';

    expect(sortDocumentsByVersion(a, b)).toEqual(-2);

    a.Version = '3.0.0';
    b.Version = '1.0.0';

    expect(sortDocumentsByVersion(a, b)).toEqual(2);

    a.Version = '1.0.0';
    b.Version = '1.0.0';

    expect(sortDocumentsByVersion(a, b)).toEqual(0);
  });

  it('Should return the difference between minor versions', () => {
    const a = DocumentMother();
    a.Version = '1.1.0';

    const b = DocumentMother();
    b.Version = '1.3.0';

    expect(sortDocumentsByVersion(a, b)).toEqual(-2);

    a.Version = '1.3.0';
    b.Version = '1.1.0';

    expect(sortDocumentsByVersion(a, b)).toEqual(2);

    a.Version = '0.1.0';
    b.Version = '0.1.0';

    expect(sortDocumentsByVersion(a, b)).toEqual(0);
  });

  it('Should return the difference between patch versions', () => {
    const a = DocumentMother();
    a.Version = '1.0.1';

    const b = DocumentMother();
    b.Version = '1.0.3';

    expect(sortDocumentsByVersion(a, b)).toEqual(-2);

    a.Version = '1.0.3';
    b.Version = '1.0.1';

    expect(sortDocumentsByVersion(a, b)).toEqual(2);

    a.Version = '0.0.1';
    b.Version = '0.0.1';

    expect(sortDocumentsByVersion(a, b)).toEqual(0);
  });

  it('Should return 0 when versions are equal', () => {
    const a = DocumentMother();
    a.Version = '1.0.0';

    const b = DocumentMother();
    b.Version = '1.0.0';

    expect(sortDocumentsByVersion(a, b)).toEqual(0);
  });

  it('Should return 0 when one or both versions are not semver', () => {
    const a = DocumentMother();
    a.Version = '1.0.0.patch' as Version;

    const b = DocumentMother();
    b.Version = '1.0.0';

    expect(sortDocumentsByVersion(a, b)).toEqual(0);

    a.Version = '1.0.0';
    b.Version = '1.0.0.patch' as Version;

    expect(sortDocumentsByVersion(a, b)).toEqual(0);

    a.Version = '1.0.0.patch' as Version;
    b.Version = '1.0.0.patch' as Version;

    expect(sortDocumentsByVersion(a, b)).toEqual(0);
  });
});
