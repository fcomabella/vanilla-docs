import { faker } from '@faker-js/faker';

export const AttachmentMother = (): string => faker.system.fileName();
