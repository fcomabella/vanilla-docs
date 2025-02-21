import { ArrayMother } from '@__mocks__/array-mother';
import { getRandom } from '@__mocks__/get-random';
import { DocumentResponseMother } from '@core/documents/infrastructure/models/__mocks__/document-response-mother';
import { DocumentResponse } from '@core/documents/infrastructure/models/document-response';

export const DocumentsResponseMother: ArrayMother<DocumentResponse> = ({
  min = 3,
  max = 6,
} = {}) =>
  Array(getRandom({ min, max }))
    .fill(undefined)
    .map(() => DocumentResponseMother());
