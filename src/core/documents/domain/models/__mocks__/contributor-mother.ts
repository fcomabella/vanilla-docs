import { Contributor } from '@core/documents/domain/models/contributor';
import { faker } from '@faker-js/faker';

export const ContributorMother = (): Contributor => ({
  ID: faker.string.uuid(),
  Name: faker.person.fullName(),
});
