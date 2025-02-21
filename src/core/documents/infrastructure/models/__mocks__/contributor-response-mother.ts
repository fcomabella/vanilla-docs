import { ContributorResponse } from '@core/documents/infrastructure/models/contributor-response';
import { faker } from '@faker-js/faker';

export const ContributorResponseMother = (): ContributorResponse => ({
  ID: faker.string.uuid(),
  Name: faker.person.fullName(),
});
