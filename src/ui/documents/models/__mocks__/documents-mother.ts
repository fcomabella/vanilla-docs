import { ArrayMother } from '@__mocks__/array-mother';
import { getRandom } from '@__mocks__/get-random';
import { DocumentMother } from '@ui/documents/models/__mocks__/document-mother';
import { Document } from '@ui/documents/models/document';

export const DocumentsMother: ArrayMother<Document> = ({
  min = 3,
  max = 6,
} = {}) =>
  Array(getRandom({ min, max }))
    .fill(undefined)
    .map(() => DocumentMother());
