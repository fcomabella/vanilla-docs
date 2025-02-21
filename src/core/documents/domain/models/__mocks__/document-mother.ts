import { AttachmentsMother } from '@core/documents/domain/models/__mocks__/attachments-mother';
import { ContributorsMother } from '@core/documents/domain/models/__mocks__/contributors-mother';
import { Document } from '@core/documents/domain/models/document';
import { Version } from '@core/shared/domain/models';
import { faker } from '@faker-js/faker';

export const DocumentMother = (): Document => ({
  Attachments: AttachmentsMother(),
  Contributors: ContributorsMother(),
  CreatedAt: faker.date.anytime(),
  ID: faker.string.uuid(),
  Title: faker.book.title(),
  UpdatedAt: faker.date.anytime(),
  Version: faker.system.semver() as Version,
});
