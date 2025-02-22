import { faker } from '@faker-js/faker';
import { NewDocumentMessage } from '../new-document-message';

export const NewDocumentMessageMother = (): NewDocumentMessage => ({
  DocumentID: faker.string.uuid(),
  DocumentTitle: faker.system.fileName(),
  UserId: faker.string.uuid(),
  UserName: faker.person.fullName(),
});
