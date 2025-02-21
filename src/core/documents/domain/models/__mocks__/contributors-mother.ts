import { ArrayMother } from '@__mocks__/array-mother';
import { getRandom } from '@__mocks__/get-random';
import { ContributorMother } from '@core/documents/domain/models/__mocks__/contributor-mother';
import { Contributor } from '@core/documents/domain/models/contributor';

export const ContributorsMother: ArrayMother<Contributor> = ({
  min = 3,
  max = 6,
} = {}) =>
  Array(getRandom({ min, max }))
    .fill(undefined)
    .map(() => ContributorMother());
