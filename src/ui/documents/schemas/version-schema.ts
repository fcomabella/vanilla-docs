import { VERSION_REGEX } from '@core/documents/infrastructure/constants';
import { z } from 'zod';

export const versionSchema = z
  .string()
  .regex(VERSION_REGEX, 'The version must be on the form 0.0.0');
