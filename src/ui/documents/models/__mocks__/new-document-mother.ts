import { AttachmentsMother } from './attachments-mother';
import { NewDocument } from '../new-document';
import { ContributorsMother } from './contributors-mother';
import { faker } from '@faker-js/faker';

export const NewDocumentMother = (): NewDocument => ({
  attachments: AttachmentsMother(),
  contributors: ContributorsMother(),
  name: faker.system.fileName(),
  version: faker.system.semver(),
});
