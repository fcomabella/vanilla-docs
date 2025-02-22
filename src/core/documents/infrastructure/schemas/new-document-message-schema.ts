import { z } from 'zod';

export const newDocumentMessageSchema = z.object({
  UserID: z.string().uuid(),
  UserName: z.string(),
  DocumentID: z.string().uuid(),
  DocumentTitle: z.string(),
});
