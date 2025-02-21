import { AttachmentsResponseMother } from '@core/documents/infrastructure/models/__mocks__/attachments-response.mother';
import { ContributorsResponseMother } from '@core/documents/infrastructure/models/__mocks__/contributors-response-mother';
import { DocumentResponse } from '@core/documents/infrastructure/models/document-response';
import { Version } from '@core/shared/domain/models';
import { faker } from '@faker-js/faker';

export const DocumentResponseMother = (): DocumentResponse => ({
  Attachments: AttachmentsResponseMother(),
  Contributors: ContributorsResponseMother(),
  CreatedAt: faker.date.anytime().toISOString(),
  ID: faker.string.uuid(),
  Title: faker.book.title(),
  UpdatedAt: faker.date.anytime().toISOString(),
  Version: faker.system.semver() as Version,
});
