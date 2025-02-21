import { ArrayMother } from '@__mocks__/array-mother';
import { getRandom } from '@__mocks__/get-random';
import { AttachmentMother } from '@core/documents/domain/models/__mocks__/attachment-mother';
import { Attachment } from '@core/documents/domain/models/attachment';

export const AttachmentsMother: ArrayMother<Attachment> = ({
  min = 3,
  max = 6,
} = {}) =>
  Array(getRandom({ min, max }))
    .fill(undefined)
    .map(() => AttachmentMother());
