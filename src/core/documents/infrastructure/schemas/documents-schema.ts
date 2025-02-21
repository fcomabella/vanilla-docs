import { documentSchema } from './document-schema';
import { z } from 'zod';

export const documentsSchema = z.array(documentSchema);
