import { NAME_MIN_LENGTH } from '@ui/documents/constants';
import { z } from 'zod';

export const nameSchema = z
  .string()
  .min(
    NAME_MIN_LENGTH,
    `The name must have at least ${NAME_MIN_LENGTH} letters`
  );
