import { faker } from '@faker-js/faker';
import { AttachmentsMother } from '@ui/documents/models/__mocks__/attachments-mother';
import { ContributorsMother } from '@ui/documents/models/__mocks__/contributors-mother';
import { Document } from '@ui/documents/models/document';

export const DocumentMother = (): Document => ({
  attachments: AttachmentsMother(),
  contributors: ContributorsMother(),
  name: faker.system.fileName(),
  version: faker.system.semver(),
  creationDate: faker.date.anytime(),
});
