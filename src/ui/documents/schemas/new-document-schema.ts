import { z } from 'zod';
import { attachmentSchema } from './attachment-schema';
import { contributorSchema } from './contributor-schema';
import { nameSchema } from './name-schema';
import { versionSchema } from './version-schema';

export const newDocumentSchema = z.object({
  name: nameSchema,
  version: versionSchema,
  attachments: z.array(attachmentSchema),
  contributors: z
    .array(contributorSchema)
    .min(1, 'A document must have at least a contributor'),
});
