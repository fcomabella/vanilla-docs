import { z } from 'zod';

export const contributorSchema = z.object({
  ID: z.string().uuid(),
  Name: z.string(),
});
