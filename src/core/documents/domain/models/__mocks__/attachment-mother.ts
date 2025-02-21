import { Attachment } from '@core/documents/domain/models/attachment';
import { faker } from '@faker-js/faker';

export const AttachmentMother = (): Attachment => faker.system.fileName();
