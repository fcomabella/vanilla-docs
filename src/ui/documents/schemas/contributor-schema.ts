import { CONTRIBUTOR_NAME_MIN_LENGTH } from '@ui/documents/constants';
import { z } from 'zod';

export const contributorSchema = z
  .string()
  .min(
    CONTRIBUTOR_NAME_MIN_LENGTH,
    `The contributor name must have ${CONTRIBUTOR_NAME_MIN_LENGTH} or more letters`
  );
