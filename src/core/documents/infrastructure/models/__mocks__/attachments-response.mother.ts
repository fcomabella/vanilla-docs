import { ArrayMother } from '@__mocks__/array-mother';
import { getRandom } from '@__mocks__/get-random';
import { AttachmentResponseMother } from '@core/documents/infrastructure/models/__mocks__/attachment-response-mother';

export const AttachmentsResponseMother: ArrayMother<string> = ({
  min = 3,
  max = 6,
} = {}) =>
  Array(getRandom({ min, max }))
    .fill(undefined)
    .map(() => AttachmentResponseMother());
