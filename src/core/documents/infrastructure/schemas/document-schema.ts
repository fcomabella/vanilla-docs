import { VERSION_REGEX } from '@core/documents/infrastructure/constants';
import { attachmentSchema } from '@core/documents/infrastructure/schemas/attachment-schema';
import { contributorSchema } from '@core/documents/infrastructure/schemas/contributor-schema';
import { z } from 'zod';

export const documentSchema = z.object({
  Attachments: z.array(attachmentSchema),
  Contributors: z.array(contributorSchema),
  CreatedAt: z.string().datetime(),
  ID: z.string().uuid(),
  Title: z.string(),
  UpdatedAt: z.string().datetime(),
  Version: z.string().regex(VERSION_REGEX),
});
