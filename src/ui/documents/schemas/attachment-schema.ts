import { ATTACHMENT_NAME_MIN_LENGTH } from '@ui/documents/constants';
import { z } from 'zod';

export const attachmentSchema = z
  .string()
  .min(
    ATTACHMENT_NAME_MIN_LENGTH,
    `The attachment name must have ${ATTACHMENT_NAME_MIN_LENGTH} or more letters.`
  );
