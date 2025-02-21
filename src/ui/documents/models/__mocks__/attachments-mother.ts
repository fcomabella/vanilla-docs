import { ArrayMother } from '@__mocks__/array-mother';
import { getRandom } from '@__mocks__/get-random';
import { AttachmentMother } from '@ui/documents/models/__mocks__/attachment-mother';

export const AttachmentsMother: ArrayMother<string> = ({
  min = 3,
  max = 6,
} = {}) =>
  Array(getRandom({ min, max }))
    .fill(undefined)
    .map(() => AttachmentMother());
