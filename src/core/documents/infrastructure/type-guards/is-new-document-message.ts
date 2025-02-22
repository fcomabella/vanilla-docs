import { NewDocumentMessage } from '@core/documents/domain/models';
import { newDocumentMessageSchema } from '@core/documents/infrastructure/schemas';

export const isNewDocumentMessage = (
  dto: unknown
): dto is NewDocumentMessage => {
  const { success } = newDocumentMessageSchema.safeParse(dto);
  return success;
};
