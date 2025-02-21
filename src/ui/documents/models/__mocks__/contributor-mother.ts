import { faker } from '@faker-js/faker';

export const ContributorMother = (): string => faker.person.fullName();
