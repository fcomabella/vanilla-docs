import { ArrayMother } from '@__mocks__/array-mother';
import { getRandom } from '@__mocks__/get-random';
import { ContributorResponseMother } from '@core/documents/infrastructure/models/__mocks__/contributor-response-mother';
import { ContributorResponse } from '@core/documents/infrastructure/models/contributor-response';

export const ContributorsResponseMother: ArrayMother<ContributorResponse> = ({
  min = 3,
  max = 6,
} = {}) =>
  Array(getRandom({ min, max }))
    .fill(undefined)
    .map(() => ContributorResponseMother());
