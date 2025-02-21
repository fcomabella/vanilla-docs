import { ArrayMother } from '@__mocks__/array-mother';
import { getRandom } from '@__mocks__/get-random';
import { ContributorMother } from '@ui/documents/models/__mocks__/contributor-mother';

export const ContributorsMother: ArrayMother<string> = ({
  min = 3,
  max = 6,
} = {}) =>
  Array(getRandom({ min, max }))
    .fill(undefined)
    .map(() => ContributorMother());
