import { NewDocument } from '@ui/documents/models/new-document';
import { newDocumentSchema } from '@ui/documents/schemas';

export const isNewDocument = (dto: unknown): dto is NewDocument => {
  const { success } = newDocumentSchema.safeParse(dto);

  return success;
};
